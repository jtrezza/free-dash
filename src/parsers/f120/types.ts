export interface PacketHeader {
  m_packetFormat: number;
  m_gameMajorVersion: number;
  m_gameMinorVersion: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: number | String;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_playerCarIndex: number;
  m_secondaryPlayerCarIndex: number;
}

export interface CarTelemetryData {
  m_speed: number;
  m_throttle: number;
  m_steer: number;
  m_brake: number;
  m_clutch: number;
  m_gear: number;
  m_engineRPM: number;
  m_drs: number;
  m_revLightsPercent: number;
  m_brakesTemperature: [number, number, number, number];
  m_tyresSurfaceTemperature: [number, number, number, number];
  m_tyresInnerTemperature: [number, number, number, number];
  m_engineTemperature: number;
  m_tyresPressure: [number, number, number, number];
  m_surfaceType: [number, number, number, number];
}

export interface PacketCarTelemetryData {
  m_header: PacketHeader;
  m_buttonStatus: number;
  m_carTelemetryData: CarTelemetryData[];
  m_mfdPanelIndex: number;
  m_mfdPanelIndexSecondaryPlayer: number;
  m_suggestedGear: number;
}

export enum packetID {
  Motion,
  Session,
  LapData,
  Event,
  Participants,
  CarSetups,
  CarTelemetry,
  CarStatus,
  FinalClassification,
  LobbyInfo,
  CarDamage,
  SessionHistory,
  Unknown,
}

export enum packetSize {
  Motion = 1464,
  Session = 251,
  LapData = 1190,
  Event = 35,
  Participants = 1213,
  CarSetups = 1102,
  CarTelemetry = 1307,
  CarStatus = 1344,
  FinalClassification = 839,
  LobbyInfo = 1169
};