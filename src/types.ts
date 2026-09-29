export type AppPage = 'LOGIN' | 'ANALYZER' | 'GEOLOCATION' | 'FORENSIC';

export interface UserAccount {
  email: string;
  name: string;
  role: string;
  clearanceLevel: string;
  lastLogin?: string;
}

export interface EmailThreatResult {
  rawInput: string;
  sender: string;
  recipient: string;
  subject: string;
  messageId: string;
  date: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'SUSPICIOUS' | 'CLEAN';
  phishingProbability: number;
  classification: string;
  detectedUrls: string[];
  attachments: string[];
  spf: string;
  dkim: string;
  dmarc: string;
  senderIp: string;
  domainImpersonation: {
    detected: boolean;
    impersonatedBrand: string;
    fakeDomain: string;
    description: string;
    confidence: number;
  };
  keyIndicators: string[];
  securityVerdict: string;
}

export interface IpGeolocationResult {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  asn: string;
  asnName: string;
  risk: string;
  riskScore: number;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  reverseDns: string;
  organization: string;
  torExitNode: boolean;
  vpnProxy: boolean;
  threatFeedScore: string;
}

export interface ForensicIntelligenceReport {
  incidentId: string;
  dateTime: string;
  severity: string;
  classification: string;
  confidence: string;
  sender: string;
  recipient: string;
  subject: string;
  messageId: string;
  attachment: string;
  urls: string;
  spf: string;
  dkim: string;
  dmarc: string;
  domainImpersonationResult: string;
  confidenceResult: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  asn: string;
  sha256Checksum: string;
  analyst: string;
}
