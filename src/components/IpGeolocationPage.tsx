import React from 'react';
import { IpGeolocationResult } from '../types';

interface IpGeolocationPageProps {
  geoData: IpGeolocationResult;
  onGenerateForensicReport: () => void;
  onBackToAnalyzer: () => void;
}

export const IpGeolocationPage: React.FC<IpGeolocationPageProps> = ({
  geoData,
  onGenerateForensicReport,
  onBackToAnalyzer,
}) => {
  return (
    <div className="min-h-screen bg-[#f1f3f6] text-[#212121]">
      {/* Flipkart Blue Top Header Bar */}
      <header className="fk-header text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToAnalyzer}
              className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition flex items-center space-x-1 cursor-pointer"
            >
              <span>←</span>
              <span>Back to Email Analyzer</span>
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight">IP Geolocation</h1>
            </div>
          </div>
          <div className="text-xs text-blue-100 hidden sm:block">
            Target IP: {geoData.ip}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Geolocation Details Card */}
        <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800">
                Network & Physical Attribution
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Target IP address routing and geographical coordinates
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-red-100 text-red-700">
              Risk: {geoData.risk}
            </span>
          </div>

          {/* 6 Required Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* IP */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block mb-1 font-semibold uppercase text-[11px]">
                IP Address
              </span>
              <span className="text-base font-bold text-[#2874f0]">
                {geoData.ip}
              </span>
            </div>

            {/* Risk */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block mb-1 font-semibold uppercase text-[11px]">
                Risk Level
              </span>
              <span className="text-base font-bold text-red-600">
                {geoData.risk}
              </span>
            </div>

            {/* Country */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block mb-1 font-semibold uppercase text-[11px]">
                Country
              </span>
              <span className="text-base font-bold text-gray-900">
                {geoData.country} ({geoData.countryCode})
              </span>
            </div>

            {/* Region */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block mb-1 font-semibold uppercase text-[11px]">
                Region
              </span>
              <span className="text-base font-bold text-gray-900">
                {geoData.region}
              </span>
            </div>

            {/* City */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block mb-1 font-semibold uppercase text-[11px]">
                City
              </span>
              <span className="text-base font-bold text-gray-900">
                {geoData.city}
              </span>
            </div>

            {/* ASN */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block mb-1 font-semibold uppercase text-[11px]">
                Autonomous System (ASN)
              </span>
              <span className="text-base font-bold text-gray-900">
                {geoData.asn}
              </span>
              <div className="text-xs text-gray-500 mt-0.5 truncate">
                {geoData.asnName}
              </div>
            </div>
          </div>

          {/* Location Information Card */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded space-y-2">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
              Location Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              <div>
                <span className="text-gray-500">Coordinates: </span>
                <span className="font-semibold text-gray-900">{geoData.latitude}° N, {geoData.longitude}° E</span>
              </div>
              <div>
                <span className="text-gray-500">Timezone: </span>
                <span className="font-semibold text-gray-900">{geoData.timezone}</span>
              </div>
              <div>
                <span className="text-gray-500">ISP / Organization: </span>
                <span className="font-semibold text-gray-900">{geoData.isp}</span>
              </div>
              <div>
                <span className="text-gray-500">Reverse DNS: </span>
                <span className="font-semibold text-gray-900">{geoData.reverseDns}</span>
              </div>
            </div>
          </div>

          {/* REQUIRED BUTTON: "GENERATE FORENSIC REPORT" */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={onGenerateForensicReport}
              className="w-full py-3.5 fk-btn-primary text-sm font-semibold rounded uppercase tracking-wider cursor-pointer"
            >
              GENERATE FORENSIC REPORT
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
