import React, { useState } from 'react';
import { EmailThreatResult } from '../types';
import { analyzeEmailContent } from '../utils/analyzer';

interface EmailAnalyzerPageProps {
  onAnalyzeSuccess: (result: EmailThreatResult) => void;
  onGenerateLocation: () => void;
  onBackToLogin: () => void;
  initialResult: EmailThreatResult | null;
  userEmail: string;
}

const DEFAULT_SAMPLE_EMAIL = `From: "PayPal Security" <security-alert@paypa1-support-verify.com>
To: karuppusamyhari3@gmail.com
Subject: URGENT: Unauthorized Account Access - Verify Your Identity Immediately
Date: Tue, 29 Sep 2026 08:42:15 +0000
Message-ID: <20260929.085230.12938@smtp.malicious-relay.net>
Received: from mail.relay-node33.net (tor-exit-04.net [185.220.101.45])
Authentication-Results: spf=softfail (paypa1-support-verify.com: 185.220.101.45 is not designated)
DKIM-Signature: v=1; a=rsa-sha256; d=unverified-relay.org; s=202601; b=invalid_hash

Dear Customer,

We detected an unauthorized login attempt to your PayPal account from an unrecognized IP address (185.220.101.45).

Your account has been temporarily restricted. You must immediately confirm your identity within 24 hours:

https://account-update-security-login.xyz/auth?id=9928

Attachment: Security_Verification_Notice.pdf.htm

PayPal Security Team`;

export const EmailAnalyzerPage: React.FC<EmailAnalyzerPageProps> = ({
  onAnalyzeSuccess,
  onGenerateLocation,
  onBackToLogin,
  initialResult,
  userEmail,
}) => {
  const [emailText, setEmailText] = useState(
    initialResult?.rawInput || DEFAULT_SAMPLE_EMAIL
  );
  const [phishingResult, setPhishingResult] = useState<EmailThreatResult | null>(
    initialResult
  );

  const handleAnalyze = () => {
    if (!emailText.trim()) return;
    const result = analyzeEmailContent(emailText, userEmail);
    setPhishingResult(result);
    onAnalyzeSuccess(result);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-[#212121]">
      {/* Flipkart Blue Top Header Bar */}
      <header className="fk-header text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToLogin}
              className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition flex items-center space-x-1 cursor-pointer"
            >
              <span>←</span>
              <span>Back to Login</span>
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Email Threat Analyzer</h1>
            </div>
          </div>
          <div className="text-xs text-blue-100 hidden sm:block">
            {userEmail}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Email Input Card */}
        <div className="bg-white rounded border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">
            Enter Email Content / Headers
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Paste suspicious email headers and body text below for threat classification:
          </p>

          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            rows={10}
            placeholder="Paste email headers and content here..."
            className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] leading-relaxed transition font-mono text-xs"
          />

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleAnalyze}
              className="px-8 py-3 fk-btn-primary text-sm font-semibold rounded uppercase tracking-wider cursor-pointer"
            >
              ANALYZE EMAIL
            </button>
            <span className="text-xs text-gray-400">
              {emailText.length} characters entered
            </span>
          </div>
        </div>

        {/* Phishing Result Card */}
        {phishingResult && (
          <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Analysis Outcome
                </span>
                <h2 className="text-xl font-bold text-red-600">
                  Phishing Detected — High Risk
                </h2>
              </div>
              <div className="sm:text-right">
                <span className="inline-block bg-red-100 text-red-800 font-bold text-xs px-3 py-1 rounded">
                  {phishingResult.phishingProbability}% Threat Confidence
                </span>
              </div>
            </div>

            {/* Phishing Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-500 block mb-0.5">Classification</span>
                <span className="font-bold text-gray-900 text-sm">{phishingResult.classification}</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-500 block mb-0.5">Detected Sender</span>
                <span className="font-semibold text-red-600 break-all text-sm">{phishingResult.sender}</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-500 block mb-0.5">Target Recipient</span>
                <span className="font-semibold text-gray-800 break-all text-sm">{phishingResult.recipient}</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-500 block mb-0.5">Subject</span>
                <span className="font-semibold text-gray-800 text-sm">{phishingResult.subject}</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded md:col-span-2">
                <span className="text-gray-500 block mb-0.5">Domain Impersonation Result</span>
                <span className="font-bold text-red-600 text-sm">{phishingResult.domainImpersonation.description}</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded md:col-span-2">
                <span className="text-gray-500 block mb-0.5">Extracted Origin IP</span>
                <span className="font-bold text-[#2874f0] text-sm">{phishingResult.senderIp}</span>
              </div>
            </div>

            {/* Key Indicators */}
            <div>
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                Key Threat Indicators:
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {phishingResult.keyIndicators.map((indicator, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* REQUIRED BUTTON BELOW PHISHING RESULT: "GENERATE LOCATION" */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={onGenerateLocation}
                className="w-full py-3.5 fk-btn-primary text-sm font-semibold rounded uppercase tracking-wider cursor-pointer"
              >
                GENERATE LOCATION
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
