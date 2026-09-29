import React from 'react';
import { ForensicIntelligenceReport } from '../types';
import { exportForensicReportPDF } from '../utils/pdfExport';

interface ForensicIntelligencePageProps {
  report: ForensicIntelligenceReport;
  onBackToGeolocation: () => void;
}

export const ForensicIntelligencePage: React.FC<ForensicIntelligencePageProps> = ({
  report,
  onBackToGeolocation,
}) => {
  const handleExportPDF = () => {
    exportForensicReportPDF(report);
  };

  const fields = [
    { label: 'Incident ID', value: report.incidentId },
    { label: 'Date and time', value: report.dateTime },
    { label: 'Severity', value: report.severity, isDanger: true },
    { label: 'Classification', value: report.classification },
    { label: 'Confidence', value: report.confidence, isAccent: true },
    { label: 'Sender', value: report.sender },
    { label: 'Recipient', value: report.recipient },
    { label: 'Subject', value: report.subject },
    { label: 'Message ID', value: report.messageId },
    { label: 'Attachment', value: report.attachment, isDanger: true },
    { label: 'URLs', value: report.urls },
    { label: 'SPF', value: report.spf, isDanger: true },
    { label: 'DKIM', value: report.dkim, isDanger: true },
    { label: 'DMARC', value: report.dmarc, isDanger: true },
    { label: 'Domain impersonation result', value: report.domainImpersonationResult, isDanger: true },
    { label: 'Confidence result', value: report.confidenceResult, isAccent: true },
  ];

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-[#212121]">
      {/* Flipkart Blue Top Header Bar */}
      <header className="fk-header text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToGeolocation}
              className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition flex items-center space-x-1 cursor-pointer"
            >
              <span>←</span>
              <span>Back to IP Geolocation</span>
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Forensic Intelligence</h1>
            </div>
          </div>

          {/* REQUIRED BUTTON: "EXPORT PDF" */}
          <button
            onClick={handleExportPDF}
            className="text-xs font-semibold bg-[#fb641b] hover:bg-[#e55b18] text-white px-4 py-2 rounded uppercase tracking-wider cursor-pointer shadow-sm transition"
          >
            EXPORT PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Forensic Intelligence Table Card */}
        <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-800">
                Incident Forensics & Telemetry Report
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Comprehensive artifact evidence matrix generated from email and IP inspection
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-[#2874f0]">
              ID: {report.incidentId}
            </span>
          </div>

          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 text-[11px] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-1/3">Field Name</th>
                  <th className="py-3 px-4 w-2/3">Forensic Artifact Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {fields.map((f, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/70 transition">
                    <td className="py-3 px-4 font-semibold text-gray-700">{f.label}</td>
                    <td
                      className={`py-3 px-4 break-all ${
                        f.isDanger
                          ? 'text-red-600 font-bold'
                          : f.isAccent
                          ? 'text-[#2874f0] font-bold'
                          : 'text-gray-900'
                      }`}
                    >
                      {f.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Export PDF Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleExportPDF}
              className="w-full py-3.5 fk-btn-primary text-sm font-semibold rounded uppercase tracking-wider cursor-pointer"
            >
              EXPORT PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
