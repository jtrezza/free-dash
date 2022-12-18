import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Parser } from 'binary-parser';
import { Buffer } from "buffer";

import { Text, View } from 'react-native';
import { RemoteInfo, Socket } from 'react-native-udp';

import { packetSize } from 'src/parsers/f120/types';
import { PacketMotionParser, PacketSessionParser, PacketLapParser, PacketEventParser,
  PacketParticipantsParser, PacketCarSetupParser, PacketCarTelemetryParser, PacketCarStatusParser,
  PacketFinalClassificationParser, PacketLobbyInfoParser } from 'src/parsers/f120/parsers';
import { PacketCarTelemetryData, PacketParticipantsData, PacketCarSetupData, PacketCarStatusData } from 'src/parsers/f120/types';

type Props = {
  socket: Socket
}

const DefaultDashboard = ({ socket }: Props) => {
  const [carTelemetry, setCarTelemetry] = useState({} as PacketCarTelemetryData);
  const [participants, setParticipants] = useState({} as PacketParticipantsData);
  const [carSetups, setCarSetups] = useState({} as PacketCarSetupData);
  const [carStatus, setCarStatus] = useState({} as PacketCarStatusData);

  useEffect(()=>{
    const parseFn = (msg: ArrayBuffer, rinfo: RemoteInfo)=>{

      switch (rinfo.size) {
        case packetSize.Motion: {
          const buffer = Buffer.from(msg);
          const parser = new PacketMotionParser();
          const data = parser.parse(buffer)
          console.log('Motion data', data)
          //setCarTelemetry(data)
          break;
        }
        case packetSize.Session: {
          const buffer = Buffer.from(msg);
          const parser = new PacketSessionParser();
          const data = parser.parse(buffer)
          console.log('Session data', data)
          //setCarTelemetry(data)
          break;
        }
        case packetSize.LapData: {
          const buffer = Buffer.from(msg);
          const parser = new PacketLapParser();
          const data = parser.parse(buffer)
          console.log('Lap data', data)
          //setCarTelemetry(data)
          break;
        }
        case packetSize.Event: {
          const buffer = Buffer.from(msg);
          const parser = new PacketEventParser();
          const data = parser.parse(buffer)
          console.log('Event data', data)
          //setCarTelemetry(data)
          break;
        }
        case packetSize.Participants: {
          const buffer = Buffer.from(msg);
          const parser = new PacketParticipantsParser();
          const data = parser.parse(buffer)
          console.log('Participants data', data)
          setParticipants(data)
          break;
        }
        case packetSize.CarSetups: {
          const buffer = Buffer.from(msg);
          const parser = new PacketCarSetupParser();
          const data = parser.parse(buffer)
          console.log('Setups data', data)
          setCarSetups(data)
          break;
        }
        case packetSize.CarTelemetry: {
          const buffer = Buffer.from(msg);
          const parser = new PacketCarTelemetryParser();
          const data = parser.parse(buffer)
          setCarTelemetry(data)
          break;
        }
        case packetSize.CarStatus: {
          const buffer = Buffer.from(msg);
          const parser = new PacketCarStatusParser();
          const data = parser.parse(buffer)
          console.log('Status data', data)
          setCarStatus(data)
          break;
        }
        case packetSize.FinalClassification: {
          const buffer = Buffer.from(msg);
          const parser = new PacketFinalClassificationParser();
          const data = parser.parse(buffer)
          console.log('Final classification data', data)
          //setCarStatus(data)
          break;
        }
        case packetSize.LobbyInfo: {
          const buffer = Buffer.from(msg);
          const parser = new PacketLobbyInfoParser();
          const data = parser.parse(buffer)
          console.log('Lobby data', data)
          //setCarStatus(data)
        }
        break;
        default:
          break;
      }
    }
    //var throttled = throttle(parseFn, 50, { 'trailing': false });
    socket.on('message', parseFn);
  }, [])

  return (
    <View style={{justifyContent: 'center', marginLeft: 20}}>
      <Text style={{fontSize: 60, fontWeight: '700'}}>{participants.m_header ? participants.m_participants[participants.m_header.m_playerCarIndex].m_name : ''}</Text>
      <Text style={{fontSize: 60, fontWeight: '700', paddingLeft: 40}}>{carTelemetry.m_header ? carTelemetry.m_carTelemetryData[carTelemetry.m_header.m_playerCarIndex].m_gear : 0}</Text>
      <Text style={{fontSize: 40, fontWeight: '700'}}>{carTelemetry.m_header ? carTelemetry.m_carTelemetryData[carTelemetry.m_header.m_playerCarIndex].m_speed : 0} km/h</Text>
      <Text style={{fontSize: 40, fontWeight: '700'}}>{carTelemetry.m_header ? carTelemetry.m_carTelemetryData[carTelemetry.m_header.m_playerCarIndex].m_engineRPM : 0} RPM</Text>
    </View>
  )
};


export default DefaultDashboard;
