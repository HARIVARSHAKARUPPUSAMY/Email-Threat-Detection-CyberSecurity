import { jsPDF } from 'jspdf';
import { ForensicIntelligenceReport } from '../types';

export function exportForensicReportPDF(report: ForensicIntelligenceReport): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 14;

  // Background Header Bar (Clean Flipkart Royal Blue)
  doc.setFillColor(40, 116, 240);
  doc.rect(margin, y, pageWidth - margin * 2, 22, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('FORENSIC INTELLIGENCE INCIDENT REPORT', margin + 6, y + 9);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(220, 235, 255);
  doc.text(`Incident ID: ${report.incidentId}  |  Severity: ${report.severity}  |  Official Forensic Dossier`, margin + 6, y + 16);

  y += 28;

  // Metadata Summary Cards (Clean Light Gray)
  const boxWidth = (pageWidth - margin * 2 - 6) / 3;
  const boxHeight = 16;

  // Box 1: Incident ID & Date
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, boxWidth, boxHeight, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('INCIDENT ID & TIMESTAMP', margin + 3, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(report.incidentId, margin + 3, y + 10);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(report.dateTime, margin + 3, y + 14);

  // Box 2: Severity & Confidence
  const box2X = margin + boxWidth + 3;
  doc.setFillColor(248, 250, 252);
  doc.rect(box2X, y, boxWidth, boxHeight, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('SEVERITY / CONFIDENCE', box2X + 3, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  doc.text(`Severity: ${report.severity}`, box2X + 3, y + 10);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 116, 240);
  doc.text(`Confidence: ${report.confidence}`, box2X + 3, y + 14);

  // Box 3: Origin IP & Location
  const box3X = margin + (boxWidth + 3) * 2;
  doc.setFillColor(248, 250, 252);
  doc.rect(box3X, y, boxWidth, boxHeight, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('ORIGIN IP & GEOLOCATION', box3X + 3, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(report.ip, box3X + 3, y + 10);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`${report.city}, ${report.country}`, box3X + 3, y + 14);

  y += 22;

  // Table of Evidence
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('FORENSIC EVIDENCE & TELEMETRY ARTIFACTS', margin, y);
  y += 4;

  const fields = [
    { label: 'Incident ID', value: report.incidentId },
    { label: 'Date and time', value: report.dateTime },
    { label: 'Severity', value: report.severity, highlight: 'red' },
    { label: 'Classification', value: report.classification },
    { label: 'Confidence', value: report.confidence, highlight: 'blue' },
    { label: 'Sender', value: report.sender },
    { label: 'Recipient', value: report.recipient },
    { label: 'Subject', value: report.subject },
    { label: 'Message ID', value: report.messageId },
    { label: 'Attachment', value: report.attachment, highlight: 'red' },
    { label: 'URLs', value: report.urls },
    { label: 'SPF', value: report.spf, highlight: 'red' },
    { label: 'DKIM', value: report.dkim, highlight: 'red' },
    { label: 'DMARC', value: report.dmarc, highlight: 'red' },
    { label: 'Domain impersonation result', value: report.domainImpersonationResult, highlight: 'red' },
    { label: 'Confidence result', value: report.confidenceResult, highlight: 'blue' },
    { label: 'IP & Geolocation', value: `${report.ip} (${report.city}, ${report.region}, ${report.country})` },
    { label: 'ASN Attribution', value: report.asn },
  ];

  fields.forEach((item, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);

    const rowHeight = item.value.length > 60 ? 11 : 8.5;
    doc.rect(margin, y, pageWidth - margin * 2, rowHeight, 'FD');

    // Label column
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(item.label, margin + 3, y + 5.5);

    // Value column
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    if (item.highlight === 'red') {
      doc.setTextColor(220, 38, 38);
      doc.setFont('helvetica', 'bold');
    } else if (item.highlight === 'blue') {
      doc.setTextColor(40, 116, 240);
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setTextColor(15, 23, 42);
    }

    const splitText = doc.splitTextToSize(item.value, pageWidth - margin * 2 - 62);
    doc.text(splitText, margin + 58, y + 5.5);

    y += rowHeight;
  });

  y += 6;

  // Chain of Custody & Hash Integrity Box
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, pageWidth - margin * 2, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 116, 240);
  doc.text('CRYPTOGRAPHIC INTEGRITY & CHAIN OF CUSTODY', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(`SHA-256 Digest: ${report.sha256Checksum}`, margin + 3, y + 9);
  doc.text(`Investigating Analyst: ${report.analyst}  |  Generated via Cyber Threat Intelligence Engine`, margin + 3, y + 13);

  const fileName = `Forensic_Report_${report.incidentId}.pdf`;
  doc.save(fileName);
}
