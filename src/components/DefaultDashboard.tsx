import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Parser } from 'binary-parser';
import { Buffer } from "buffer";

import { Text, View } from 'react-native';
import { RemoteInfo, Socket } from 'react-native-udp';

import { packetSize } from 'src/parsers/f120/types';
import PacketCarTelemetryParser from 'src/parsers/f120/PacketCarTelemetryParser';
import { PacketCarTelemetryData } from 'src/parsers/f120/types';

type Props = {
  socket: Socket
}

const DefaultDashboard = ({ socket }: Props) => {
  const [carTelemetry, setCarTelemetry] = useState({} as PacketCarTelemetryData);

  useEffect(()=>{
    const parseFn = (msg: ArrayBuffer, rinfo: RemoteInfo)=>{

      switch (rinfo.size) {
        case packetSize.Motion: {
          //const { data } = new PacketMotionDataParser(msg);
          console.log('Motion')
          break;
        }
        case packetSize.Session:
          {
            //const { data } = new PacketSessionDataParser(msg);
            console.log('session');
          }
          break;
        case packetSize.LapData: {
          //const { data } = new PacketLapDataParser(msg);
          console.log('lapData');

          break;
        }
        case packetSize.Event: {
          //const { data } = new PacketEventDataParser(msg);
          console.log('event');

          break;
        }
        case packetSize.Participants: {
          //const { data } = new PacketParticipantsParser(msg);
          console.log('participants');

          break;
        }
        case packetSize.CarSetups: {
          //const { data } = new PacketCarSetupDataParser(msg);
          console.log('carSetups');
          // log packet size

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
          //const { data } = new PacketCarStatusDataParser(msg);
          console.log('carStatus');
          break;
        }

        case packetSize.FinalClassification: {
          //const { data } = new PacketFinalClassificationDataParser(msg);
          console.log('finalClassification');
          break;
        }

        case packetSize.LobbyInfo:
          {
            //const { data } = new PacketLobbyInfoDataParser(msg);
            console.log('lobbyInfo');
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
      <Text style={{fontSize: 60, fontWeight: '700', paddingLeft: 40}}>{carTelemetry.m_header ? carTelemetry.m_carTelemetryData[carTelemetry.m_header.m_playerCarIndex].m_gear : 0}</Text>
      <Text style={{fontSize: 40, fontWeight: '700'}}>{carTelemetry.m_header ? carTelemetry.m_carTelemetryData[carTelemetry.m_header.m_playerCarIndex].m_speed : 0} km/h</Text>
      <Text style={{fontSize: 40, fontWeight: '700'}}>{carTelemetry.m_header ? carTelemetry.m_carTelemetryData[carTelemetry.m_header.m_playerCarIndex].m_engineRPM : 0} RPM</Text>
    </View>
  )
};


export default DefaultDashboard;
