"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

import type { HomeIndustryTabRecord } from "@/lib/content-types";

// Default industry icons - simple circular icons matching original design
const industryIcons: Record<string, React.ReactNode> = {
  "Health Tech": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.17 11.17C20.01 10.35 21.18 10 22.5 10C23.81 10 24.98 10.35 25.82 11.17C26.66 11.98 27.03 13.11 27.03 14.38C27.03 15.65 26.66 16.78 25.82 17.59C24.98 18.4 23.81 18.76 22.5 18.76C21.18 18.76 20.02 18.4 19.18 17.59C18.34 16.78 17.97 15.65 17.97 14.38C17.97 13.11 18.34 11.98 19.18 11.17M22.5 22.83C21.48 21.89 20.18 20.92 18.78 20.4C17.99 20.12 17.16 19.97 16.32 20.08C15.47 20.18 14.65 20.55 13.9 21.24C12.63 22.4 12.31 23.86 12.59 25.34C12.87 26.81 13.73 28.31 14.82 29.66C15.91 31 17.19 32.19 18.62 33.2C19.95 34.14 21.32 34.82 22.42 35C22.47 35 22.53 35 22.58 35C23.68 34.82 25.05 34.14 26.38 33.2C27.81 32.19 29.09 31 30.18 29.66C31.27 28.31 32.13 26.81 32.4 25.34C32.69 23.86 32.37 22.4 31.1 21.24C30.35 20.55 29.53 20.18 28.68 20.08C27.84 19.97 27 20.11 26.22 20.41C24.82 20.92 23.52 21.9 22.5 22.83Z" fill="#181818"/>
    </svg>
  ),
  "Hospital Management Systems": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M14 15H31V31H14V15Z" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 18V28M17.5 23H27.5" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Telemedicine": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="12" y="14" width="21" height="14" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M18 32H27" stroke="#181818" strokeWidth="2"/>
      <circle cx="22.5" cy="21" r="3" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Pharmacy Management": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M15 14H30L28 32H17L15 14Z" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 18V26M19 22H26" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Medical Devices Software": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M12 22H15L18 16L22.5 28L26 20L28 22H33" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Healthcare Analytics": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="24" width="5" height="8" fill="#181818"/>
      <rect x="20" y="18" width="5" height="14" fill="#181818"/>
      <rect x="27" y="14" width="5" height="18" fill="#181818"/>
    </svg>
  ),
  "FinTech": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <circle cx="22.5" cy="22.5" r="9" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 17V28M19 20H24C25.1 20 26 20.9 26 22C26 23.1 25.1 24 24 24H19H24C25.1 24 26 24.9 26 26C26 27.1 25.1 28 24 28H19" stroke="#181818" strokeWidth="1.5"/>
    </svg>
  ),
  "Banking Software": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M12 18L22.5 12L33 18V20H12V18Z" stroke="#181818" strokeWidth="2"/>
      <path d="M14 20V30M19 20V30M26 20V30M31 20V30" stroke="#181818" strokeWidth="2"/>
      <path d="M12 30H33V32H12V30Z" fill="#181818"/>
    </svg>
  ),
  "Insurance Platforms": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 12L30 16V22C30 27 26.5 31 22.5 33C18.5 31 15 27 15 22V16L22.5 12Z" stroke="#181818" strokeWidth="2"/>
      <path d="M19 22L21.5 24.5L26 20" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Digital Lending": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="14" y="16" width="17" height="13" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M18 22H27" stroke="#181818" strokeWidth="2"/>
      <path d="M18 25H24" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Risk & Compliance": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 14L13 19V24C13 29 17 33 22.5 35C28 33 32 29 32 24V19L22.5 14Z" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Wealth Management": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M14 28L19 22L24 26L31 18" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27 18H31V22" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Retail": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M16 16H29L31 32H14L16 16Z" stroke="#181818" strokeWidth="2"/>
      <path d="M19 16V14C19 12.3 20.3 11 22 11H23C24.7 11 26 12.3 26 14V16" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "E-Commerce Platforms": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <circle cx="18" cy="32" r="2" fill="#181818"/>
      <circle cx="28" cy="32" r="2" fill="#181818"/>
      <path d="M12 14H15L18 28H30L33 18H17" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "POS Systems": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="13" width="19" height="19" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M13 20H32" stroke="#181818" strokeWidth="2"/>
      <rect x="16" y="24" width="4" height="3" fill="#181818"/>
      <rect x="22" y="24" width="4" height="3" fill="#181818"/>
    </svg>
  ),
  "Inventory Management": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="14" y="14" width="17" height="17" stroke="#181818" strokeWidth="2"/>
      <path d="M14 20H31M22 14V31" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Customer Loyalty Apps": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 28L16 32V15C16 14 16.9 13 18 13H27C28.1 13 29 14 29 15V32L22.5 28Z" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Marketplace Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="18" width="8" height="14" stroke="#181818" strokeWidth="2"/>
      <rect x="24" y="18" width="8" height="14" stroke="#181818" strokeWidth="2"/>
      <path d="M13 18L17 12H28L32 18" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Point of Sale (POS)": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="13" width="19" height="19" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M13 20H32" stroke="#181818" strokeWidth="2"/>
      <rect x="16" y="24" width="4" height="3" fill="#181818"/>
      <rect x="22" y="24" width="4" height="3" fill="#181818"/>
    </svg>
  ),
  "Inventory & Supply Chain Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="12" y="22" width="8" height="10" stroke="#181818" strokeWidth="2"/>
      <rect x="25" y="22" width="8" height="10" stroke="#181818" strokeWidth="2"/>
      <path d="M20 27H25M16 18V22M29 13V22" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Marketplace Development": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <circle cx="22.5" cy="22.5" r="9" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 13.5V22.5H31.5" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Industry 4.0 Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <circle cx="22.5" cy="22.5" r="6" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 12V16M22.5 29V33M33 22.5H29M16 22.5H12M29 16L26 19M19 26L16 29M29 29L26 26M19 19L16 16" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Automation & Robotics": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="17" y="14" width="11" height="8" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 22V26M17 26H28V32H17V26Z" stroke="#181818" strokeWidth="2"/>
      <circle cx="19" cy="18" r="1" fill="#181818"/>
      <circle cx="26" cy="18" r="1" fill="#181818"/>
    </svg>
  ),
  "Smart Manufacturing": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="16" width="19" height="16" stroke="#181818" strokeWidth="2"/>
      <path d="M18 16V12H27V16M18 24H27" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Vehicle Telematics": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M14 25L16 18H29L31 25V30H14V25Z" stroke="#181818" strokeWidth="2"/>
      <circle cx="18" cy="30" r="2" fill="#181818"/>
      <circle cx="27" cy="30" r="2" fill="#181818"/>
      <path d="M22.5 13V18" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "EdTech Platforms": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 14L32 19L22.5 24L13 19L22.5 14Z" stroke="#181818" strokeWidth="2"/>
      <path d="M17 21V28L22.5 31L28 28V21" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Online Learning Management Systems (LMS)": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="14" width="19" height="13" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M18 31H27M22.5 27V31" stroke="#181818" strokeWidth="2"/>
      <path d="M17 18H21M17 22H25" stroke="#181818" strokeWidth="1.5"/>
    </svg>
  ),
  "Virtual Classroom Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="12" y="14" width="21" height="14" rx="2" stroke="#181818" strokeWidth="2"/>
      <circle cx="22.5" cy="21" r="3" stroke="#181818" strokeWidth="2"/>
      <path d="M18 32H27" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "PropTech": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 12L32 20V32H13V20L22.5 12Z" stroke="#181818" strokeWidth="2"/>
      <rect x="19" y="24" width="7" height="8" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Real Estate CRM & ERP": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="13" width="19" height="19" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M13 19H32M19 19V32M26 19V32" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Smart Building Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="15" y="14" width="15" height="18" stroke="#181818" strokeWidth="2"/>
      <rect x="18" y="18" width="3" height="3" fill="#181818"/>
      <rect x="24" y="18" width="3" height="3" fill="#181818"/>
      <rect x="18" y="24" width="3" height="3" fill="#181818"/>
      <rect x="24" y="24" width="3" height="3" fill="#181818"/>
    </svg>
  ),
  "Travel Portals & Booking Systems": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <circle cx="22.5" cy="22.5" r="9" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 13.5V31.5M13.5 22.5H31.5" stroke="#181818" strokeWidth="2"/>
      <ellipse cx="22.5" cy="22.5" rx="4" ry="9" stroke="#181818" strokeWidth="1.5"/>
    </svg>
  ),
  "Hotel Management Software": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="17" width="19" height="15" stroke="#181818" strokeWidth="2"/>
      <path d="M22.5 13V17M13 22H32" stroke="#181818" strokeWidth="2"/>
      <rect x="17" y="26" width="4" height="6" stroke="#181818" strokeWidth="1.5"/>
    </svg>
  ),
  "Tourism Apps": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 12L25 20H33L27 25L29 33L22.5 28L16 33L18 25L12 20H20L22.5 12Z" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "OTT Platforms": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="14" width="19" height="13" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M20 19L26 22L20 25V19Z" fill="#181818"/>
      <path d="M18 31H27M22.5 27V31" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Content Management Systems": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="13" width="19" height="19" rx="2" stroke="#181818" strokeWidth="2"/>
      <path d="M17 18H28M17 23H25M17 28H22" stroke="#181818" strokeWidth="2"/>
    </svg>
  ),
  "Communication Tools": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M13 14H32V26H22L17 30V26H13V14Z" stroke="#181818" strokeWidth="2"/>
      <path d="M18 18H27M18 22H24" stroke="#181818" strokeWidth="1.5"/>
    </svg>
  ),
  "Renewable Energy Tech": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <circle cx="22.5" cy="22.5" r="9" fill="#4CAF50" />
      <path d="M22.5 13V32M13 22.5H32" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22.5" cy="22.5" r="3" fill="#FFC107" />
    </svg>
  ),
  "Smart Grid Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="14" y="14" width="17" height="17" rx="2" stroke="#181818" strokeWidth="2" />
      <path d="M22.5 14V31M14 22.5H31" stroke="#181818" strokeWidth="2" />
    </svg>
  ),
  "Oil & Gas IT Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 12C26 18 30 22 30 26C30 30.1421 26.6421 33.5 22.5 33.5C18.3579 33.5 15 30.1421 15 26C15 22 19 18 22.5 12Z" fill="#181818" />
      <path d="M22.5 20V29" stroke="white" strokeWidth="2" />
    </svg>
  ),
  "Fleet Management": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M14 24L17 18H28L31 24V29H14V24Z" stroke="#181818" strokeWidth="2" />
      <circle cx="18" cy="29" r="2" fill="#181818" />
      <circle cx="27" cy="29" r="2" fill="#181818" />
    </svg>
  ),
  "Logistics ERP": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <rect x="13" y="13" width="19" height="19" rx="2" stroke="#181818" strokeWidth="2" />
      <path d="M18 18H27M18 23H27M18 28H24" stroke="#181818" strokeWidth="2" />
    </svg>
  ),
  "Delivery & Tracking Systems": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M15 17H25V28H15V17Z" stroke="#181818" strokeWidth="2" />
      <path d="M25 21H30L32 24V28H25V21Z" stroke="#181818" strokeWidth="2" />
      <circle cx="18" cy="29" r="2" fill="#181818" />
      <circle cx="29" cy="29" r="2" fill="#181818" />
    </svg>
  ),
  "FoodTech": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M18 14V22M22 14V22M26 14V22M18 22V31M22 22V31M26 22V31" stroke="#181818" strokeWidth="2" />
      <path d="M30 14V31" stroke="#181818" strokeWidth="2" />
    </svg>
  ),
  "AgriTech Solutions": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M22.5 30C27 30 30 26 30 21C25.5 21 22.5 24 22.5 30Z" fill="#4CAF50" />
      <path d="M22.5 30C18 30 15 26 15 21C19.5 21 22.5 24 22.5 30Z" fill="#66BB6A" />
      <path d="M22.5 16V32" stroke="#181818" strokeWidth="2" />
    </svg>
  ),
  "Restaurant Management Apps": (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <path d="M16 14V22M20 14V22M24 14V22M16 22V31M20 22V31M24 22V31" stroke="#181818" strokeWidth="2" />
      <path d="M29 14V31" stroke="#181818" strokeWidth="2" />
    </svg>
  ),
};

// Fallback icon for items without a specific icon
function DefaultIcon({ label }: { label: string }) {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="45" height="45" rx="22.5" fill="#F2F2F2" />
      <text x="22.5" y="27" textAnchor="middle" fill="#181818" fontSize="14" fontWeight="600">
        {label.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
}

function ItemIcon({ title, iconUrl }: { title: string; iconUrl?: string }) {
  // If custom icon URL provided, use it
  if (iconUrl) {
    return (
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#F2F2F2]">
        <Image src={iconUrl} alt={title} fill className="object-contain p-2" />
      </div>
    );
  }

  // Check if we have a predefined icon
  const predefinedIcon = industryIcons[title];
  if (predefinedIcon) {
    return <>{predefinedIcon}</>;
  }
  
  // Fallback to text-based icon
  return <DefaultIcon label={title} />;
}

const defaultTabs: HomeIndustryTabRecord[] = [
  { id: "health", label: "Healthcare & Life Sciences", items: [{ title: "Health Tech" }, { title: "Hospital Management Systems" }, { title: "Telemedicine" }, { title: "Pharmacy Management" }, { title: "Medical Devices Software" }, { title: "Healthcare Analytics" }] },
  { id: "banking", label: "Banking, Finance & Insurance", items: [{ title: "FinTech" }, { title: "Banking Software" }, { title: "Insurance Platforms" }, { title: "Digital Lending" }, { title: "Risk & Compliance" }, { title: "Wealth Management" }] },
  { id: "retail", label: "Retail & E-Commerce", items: [{ title: "Retail" }, { title: "E-Commerce Platforms" }, { title: "Point of Sale (POS)" }, { title: "Inventory Management" }, { title: "Customer Loyalty Apps" }, { title: "Marketplace Solutions" }] },
  { id: "automotive", label: "Automotive & Manufacturing", items: [{ title: "Industry 4.0 Solutions" }, { title: "Automation & Robotics" }, { title: "Smart Manufacturing" }, { title: "Vehicle Telematics" }, { title: "Supply Chain Optimization" }, { title: "Quality Management" }] },
  { id: "education", label: "Education & E-Learning", items: [{ title: "EdTech Platforms" }, { title: "Online Learning Management Systems (LMS)" }, { title: "Virtual Classroom Solutions" }, { title: "Student Information Systems" }, { title: "Assessment Tools" }, { title: "Educational Content Delivery" }] },
  { id: "realestate", label: "Real Estate & Construction", items: [{ title: "PropTech" }, { title: "Real Estate CRM & ERP" }, { title: "Smart Building Solutions" }, { title: "Property Management" }, { title: "Construction Management" }, { title: "Virtual Tours & 3D Visualization" }] },
  { id: "travel", label: "Travel & Hospitality", items: [{ title: "Travel Portals & Booking Systems" }, { title: "Hotel Management Software" }, { title: "Tourism Apps" }, { title: "Restaurant POS" }, { title: "Customer Experience Platforms" }, { title: "Loyalty Programs" }] },
  { id: "telecom", label: "Telecom & Media", items: [{ title: "OTT Platforms" }, { title: "Content Management Systems" }, { title: "Communication Tools" }, { title: "Media Streaming" }, { title: "Telecom Billing" }, { title: "Network Management" }] },
  { id: "energy", label: "Energy & Utilities", items: [{ title: "Renewable Energy Tech" }, { title: "Smart Grid Solutions" }, { title: "Oil & Gas IT Solutions" }] },
  { id: "logistics", label: "Logistics & Transportation", items: [{ title: "Fleet Management" }, { title: "Logistics ERP" }, { title: "Delivery & Tracking Systems" }] },
  { id: "food", label: "Food & Agriculture", items: [{ title: "FoodTech" }, { title: "AgriTech Solutions" }, { title: "Restaurant Management Apps" }] },
];

// Tab icons (colorful icons shown on active tabs)
const tabIcons: Record<string, React.ReactNode> = {
  "health": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10C35 4 27 2 20 6C13 10 10 18 12 26C14 34 22 44 40 58C58 44 66 34 68 26C70 18 67 10 60 6C53 2 45 4 40 10Z" fill="#E53935"/>
      <path d="M28 35L20 42L28 49" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M52 35L60 42L52 49" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 42H60" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  "banking": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="50" height="40" rx="4" fill="#1565C0"/>
      <path d="M40 10L65 25H15L40 10Z" fill="#1976D2"/>
      <rect x="22" y="32" width="8" height="20" fill="#FFC107"/>
      <rect x="36" y="32" width="8" height="20" fill="#FFC107"/>
      <rect x="50" y="32" width="8" height="20" fill="#FFC107"/>
      <rect x="15" y="55" width="50" height="5" fill="#0D47A1"/>
    </svg>
  ),
  "retail": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="58" r="5" fill="#FF9800"/>
      <circle cx="55" cy="58" r="5" fill="#FF9800"/>
      <path d="M15 15H22L30 45H55L62 22H28" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="35" y="28" width="15" height="12" fill="#2196F3"/>
    </svg>
  ),
  "automotive": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40L25 25H55L60 40V50H20V40Z" fill="#607D8B"/>
      <circle cx="28" cy="50" r="6" fill="#37474F"/>
      <circle cx="52" cy="50" r="6" fill="#37474F"/>
      <rect x="30" y="30" width="20" height="8" rx="2" fill="#81D4FA"/>
      <circle cx="40" cy="18" r="8" fill="#FFC107"/>
      <path d="M40 12V24M34 18H46" stroke="#FF9800" strokeWidth="2"/>
    </svg>
  ),
  "education": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10L70 25L40 40L10 25L40 10Z" fill="#3F51B5"/>
      <path d="M20 30V48L40 58L60 48V30" fill="#5C6BC0"/>
      <path d="M40 40V58" stroke="#FFC107" strokeWidth="3"/>
      <circle cx="40" cy="58" r="4" fill="#FFC107"/>
      <rect x="65" y="25" width="4" height="25" fill="#FFC107"/>
    </svg>
  ),
  "realestate": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 8L70 30V60H10V30L40 8Z" fill="#795548"/>
      <rect x="32" y="40" width="16" height="20" fill="#FFC107"/>
      <rect x="18" y="35" width="10" height="10" fill="#81D4FA"/>
      <rect x="52" y="35" width="10" height="10" fill="#81D4FA"/>
      <path d="M40 8L70 30H10L40 8Z" fill="#A1887F"/>
    </svg>
  ),
  "travel": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="38" r="28" fill="#2196F3"/>
      <ellipse cx="40" cy="38" rx="12" ry="28" stroke="white" strokeWidth="2"/>
      <path d="M12 38H68" stroke="white" strokeWidth="2"/>
      <path d="M18 25H62" stroke="white" strokeWidth="1.5"/>
      <path d="M18 51H62" stroke="white" strokeWidth="1.5"/>
      <path d="M40 10V66" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  "telecom": (
    <svg width="80" height="73" viewBox="0 0 80 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="10" width="30" height="50" rx="4" fill="#9C27B0"/>
      <rect x="30" y="15" width="20" height="30" fill="#E1BEE7"/>
      <circle cx="40" cy="52" r="4" stroke="white" strokeWidth="2"/>
      <path d="M55 8C60 12 63 18 63 25" stroke="#FFC107" strokeWidth="3" strokeLinecap="round"/>
      <path d="M60 5C68 11 72 20 72 30" stroke="#FFC107" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  "energy": (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="33.5" cy="33.5" r="24" fill="#4CAF50" />
      <path d="M33.5 12V55M12 33.5H55" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="33.5" cy="33.5" r="8" fill="#FFC107" />
    </svg>
  ),
  "logistics": (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 38L21 26H42L50 38V50H15V38Z" fill="#607D8B" />
      <rect x="42" y="31" width="10" height="19" fill="#90A4AE" />
      <circle cx="25" cy="50" r="6" fill="#37474F" />
      <circle cx="44" cy="50" r="6" fill="#37474F" />
    </svg>
  ),
  "food": (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="33.5" cy="33.5" r="24" fill="#8BC34A" />
      <path d="M28 20V47M33.5 20V47M39 20V47" stroke="white" strokeWidth="3" />
      <path d="M45 20V47" stroke="#FFC107" strokeWidth="3" />
    </svg>
  ),
};

function TabIcon({ tabId }: { tabId: string }) {
  const icon = tabIcons[tabId];
  if (icon) {
    return <div className="h-10 w-11 flex-shrink-0 [&_svg]:h-full [&_svg]:w-full">{icon}</div>;
  }
  return null;
}

function TabBadge({ label, tabId, tabIconUrl }: { label: string; tabId: string; tabIconUrl?: string }) {
  // First priority: custom uploaded icon
  if (tabIconUrl) {
    return (
      <div className="flex h-10 w-11 items-center justify-center">
        <img src={tabIconUrl} alt={label} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  // Second priority: predefined colorful tab icon
  if (tabIcons[tabId]) {
    return <TabIcon tabId={tabId} />;
  }
  // Fallback to text badge
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.2)] text-xs font-medium leading-snug text-fg">
      {label.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function HomeIndustriesSection({
  title = "Industries We Serve",
  subtitle = "We serve a diverse range of industries, catering to a wide spectrum of fields and sectors.",
  tabs = defaultTabs,
}: {
  title?: string;
  subtitle?: string;
  tabs?: HomeIndustryTabRecord[];
}) {
  const resolvedTabs = tabs.length > 0 ? tabs : defaultTabs;
  const [active, setActive] = useState(resolvedTabs[0]?.id ?? "");
  const activeIndex = Math.max(0, resolvedTabs.findIndex((t) => t.id === active));
  const activeTab = resolvedTabs[activeIndex];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const nextTab = resolvedTabs[(activeIndex + delta + resolvedTabs.length) % resolvedTabs.length];
    setActive(nextTab.id);
    document.getElementById(`industry-tab-${nextTab.id}`)?.focus();
  };

  return (
    <section aria-labelledby="industries-title" className="relative w-full overflow-hidden bg-canvas-2 py-14 sm:py-16 lg:py-20">
      <div aria-hidden className="absolute inset-x-0 top-0 rule-gold" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-tech/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 2xl:px-[45px]">
        <Reveal>
          <SectionHeading id="industries-title" eyebrow="Industries" title={title} subtitle={subtitle} />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[1180px] gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Industry rail */}
          <div
            role="tablist"
            aria-label="Industries"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {resolvedTabs.map((tab, index) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`industry-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={clsx(
                    "group relative flex shrink-0 snap-start items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-300 lg:w-full lg:px-4 lg:py-2.5",
                    isActive ? "bg-surface shadow-[var(--shadow-card)] ring-1 ring-line-gold" : "hover:bg-surface/60"
                  )}
                >
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute left-0 top-1/2 hidden h-8 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-gold to-tech transition-opacity lg:block",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className={clsx("font-mono text-xs tracking-[0.15em]", isActive ? "text-gold-ink" : "text-fg-subtle")}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={clsx("whitespace-nowrap text-[13.5px] font-medium lg:whitespace-normal", isActive ? "text-fg" : "text-fg-muted group-hover:text-fg")}>
                    {tab.label}
                  </span>
                  <span className={clsx("ml-auto hidden text-xs lg:inline", isActive ? "text-tech" : "text-fg-subtle")}>{tab.items.length}</span>
                </button>
              );
            })}
          </div>

          {/* Active industry panel */}
          {activeTab ? (
            <div
              key={activeTab.id}
              id={`industry-panel-${activeTab.id}`}
              role="tabpanel"
              aria-labelledby={`industry-tab-${activeTab.id}`}
              className="glass relative self-start overflow-hidden rounded-[24px] p-5 sm:p-6 lg:col-span-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            >
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative flex items-center gap-4">
                <TabBadge label={activeTab.label} tabId={activeTab.id} tabIconUrl={activeTab.tabIconUrl} />
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Sector focus</p>
                  <h3 className="font-display text-base font-semibold text-fg sm:text-lg">{activeTab.label}</h3>
                </div>
              </div>

              <ul className="relative mt-5 grid grid-cols-2 gap-2.5 xl:grid-cols-3">
                {activeTab.items.map((item, index) => (
                  <li
                    key={`${activeTab.id}-${index}`}
                    className="border-glow group flex min-h-[92px] flex-col justify-between rounded-xl bg-surface p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="block h-8 w-8 [&>*]:!h-8 [&>*]:!w-8 [&_svg]:!h-8 [&_svg]:!w-8">
                        <ItemIcon title={item.title} iconUrl={item.iconUrl} />
                      </span>
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                    </div>
                    <span className="mt-2.5 text-[13px] font-medium leading-snug text-fg">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
