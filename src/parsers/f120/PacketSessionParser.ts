import { Parser } from 'binary-parser';
import PacketHeaderParser from './PacketHeaderParser';

export class MarshalZoneParser extends Parser {
  constructor() {
    super();
    this.endianess('little').floatle('m_zoneStart').int8('m_zoneFlag');
  }
}

export class WeatherForecastSampleParser extends Parser {
  constructor() {
    super();
    this.endianess('little')
      .uint8('m_sessionType')
      .uint8('m_timeOffset')
      .uint8('m_weather')
      .int8('m_trackTemperature')
      .int8('m_airTemperature')
  }
}

export default class PacketSessionParser extends Parser {
  constructor() {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .uint8('m_weather')                   // Weather - 0 = clear, 1 = light cloud, 2 = overcast
                                            // 3 = light rain, 4 = heavy rain, 5 = storm
      .int8('m_trackTemperature')          // Track temp. in degrees celsius
      .int8('m_airTemperature')            // Air temp. in degrees celsius
      .uint8('m_totalLaps')                 // Total number of laps in this race
      .uint16('m_trackLength')               // Track length in metres
      .uint8('m_sessionType')               // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P
                                                  // 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ
                                                  // 10 = R, 11 = R2, 12 = Time Trial
      .int8('m_trackId')                   // -1 for unknown, 0-21 for tracks, see appendix
      .uint8('m_formula')                   // Formula, 0 = F1 Modern, 1 = F1 Classic, 2 = F2,
                                                  // 3 = F1 Generic
      .uint16('m_sessionTimeLeft')           // Time left in session in seconds
      .uint16('m_sessionDuration')           // Session duration in seconds
      .uint8('m_pitSpeedLimit')             // Pit speed limit in kilometres per hour
      .uint8('m_gamePaused')                // Whether the game is paused
      .uint8('m_isSpectating')              // Whether the player is spectating
      .uint8('m_spectatorCarIndex')         // Index of the car being spectated
      .uint8('m_sliProNativeSupport')	 // SLI Pro support, 0 = inactive, 1 = active
      .uint8('m_numMarshalZones')           // Number of marshal zones to follow
      .array('m_marshalZones', {type: new MarshalZoneParser(), length: 21})
      .uint8('m_safetyCarStatus')           // 0 = no safety car, 1 = full safety car
                                            // 2 = virtual safety car
      .uint8('m_networkGame')               // 0 = offline, 1 = online
      .uint8('m_numWeatherForecastSamples') // Number of weather samples to follow
      .array('m_weatherForecastSamples', {type: new WeatherForecastSampleParser(), length: 20})
  }
}