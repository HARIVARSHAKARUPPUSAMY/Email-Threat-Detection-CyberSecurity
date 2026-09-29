/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppPage, EmailThreatResult, IpGeolocationResult, ForensicIntelligenceReport } from './types';
import { SAMPLE_EMAILS, analyzeEmailContent, getGeolocationForIp, generateForensicReport } from './utils/analyzer';
import { LoginPage } from './components/LoginPage';
import { EmailAnalyzerPage } from './components/EmailAnalyzerPage';
import { IpGeolocationPage } from './components/IpGeolocationPage';
import { ForensicIntelligencePage } from './components/ForensicIntelligencePage';

export default function App() {
  // Required: When the website is opened, the LOGIN PAGE must appear first.
  const [currentPage, setCurrentPage] = useState<AppPage>('LOGIN');
  const [currentUser, setCurrentUser] = useState<string>('karuppusamyhari3@gmail.com');

  // Email Analysis Result
  const [emailResult, setEmailResult] = useState<EmailThreatResult | null>(null);

  // Geolocation Result
  const [geoResult, setGeoResult] = useState<IpGeolocationResult>(() =>
    getGeolocationForIp('185.220.101.45')
  );

  // Forensic Report
  const [forensicReport, setForensicReport] = useState<ForensicIntelligenceReport | null>(null);

  const handleLoginSuccess = (email: string) => {
    setCurrentUser(email);
    // After successful login: Navigate to PAGE 2
    setCurrentPage('ANALYZER');
  };

  const handleAnalyzeEmailSuccess = (result: EmailThreatResult) => {
    setEmailResult(result);
    const geo = getGeolocationForIp(result.senderIp);
    setGeoResult(geo);
    const report = generateForensicReport(result, geo, currentUser);
    setForensicReport(report);
  };

  const handleGenerateLocation = () => {
    if (emailResult) {
      const geo = getGeolocationForIp(emailResult.senderIp);
      setGeoResult(geo);
    }
    // When "GENERATE LOCATION" is clicked: Navigate to PAGE 3
    setCurrentPage('GEOLOCATION');
  };

  const handleGenerateForensicReport = () => {
    const activeAnalysis = emailResult || analyzeEmailContent(SAMPLE_EMAILS[0].content, currentUser);
    const activeGeo = geoResult || getGeolocationForIp('185.220.101.45');
    const report = generateForensicReport(activeAnalysis, activeGeo, currentUser);
    setForensicReport(report);
    // When "GENERATE FORENSIC REPORT" is clicked: Navigate to PAGE 4
    setCurrentPage('FORENSIC');
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-[#212121]">
      {currentPage === 'LOGIN' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}

      {currentPage === 'ANALYZER' && (
        <EmailAnalyzerPage
          onAnalyzeSuccess={handleAnalyzeEmailSuccess}
          onGenerateLocation={handleGenerateLocation}
          onBackToLogin={() => setCurrentPage('LOGIN')}
          initialResult={emailResult}
          userEmail={currentUser}
        />
      )}

      {currentPage === 'GEOLOCATION' && (
        <IpGeolocationPage
          geoData={geoResult}
          onGenerateForensicReport={handleGenerateForensicReport}
          onBackToAnalyzer={() => setCurrentPage('ANALYZER')}
        />
      )}

      {currentPage === 'FORENSIC' && forensicReport && (
        <ForensicIntelligencePage
          report={forensicReport}
          onBackToGeolocation={() => setCurrentPage('GEOLOCATION')}
        />
      )}
    </div>
  );
}
