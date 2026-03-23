import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { fetchSources } from '../services/api';

const TOP_100_SOURCES = [
  "TechCrunch", "HackerNews", "Wired", "TheVerge", "ArsTechnica", 
  "Engadget", "CNET", "TechRadar", "VentureBeat", "ZDNet",
  "Computerworld", "Gizmodo", "DigitalTrends", "Mashable", "PCWorld",
  "TheNextWeb", "GeekWire", "MITTechnologyReview", "Recode", "ReadWrite",
  "Techmeme", "Gadgets360", "AppleInsider", "MacRumors", "9to5Mac",
  "AndroidAuthority", "AndroidCentral", "Tom'sHardware", "AnandTech", "TechSpot",
  "ExtremeTech", "TweakTown", "Guru3D", "Wccftech", "Neowin",
  "Betanews", "BleepingComputer", "DarkReading", "KrebsOnSecurity", "TheHackerNews",
  "InfoQ", "DZone", "SmashingMagazine", "AListApart", "CSS-Tricks",
  "SitePoint", "HackerNoon", "FreeCodeCamp", "Dev.to", "Hashnode",
  "Slashdot", "YCombinator", "ProductHunt", "IndieHackers", "TechRepublic",
  "TechTarget", "InformationWeek", "CIO", "CSO", "NetworkWorld",
  "Spiceworks", "Gigaom", "PandoDaily", "SiliconANGLE", "TechInAsia", 
  "e27", "DealStreetAsia", "KrASIA", "TechNode", "TechEU", 
  "Sifted", "Maddyness", "TechNative", "CloudPro", "ITPro", 
  "ComputerWeekly", "ZDNetUK", "TechRadarPro", "Techworld", "V3",
  "TheInquirer", "Hexus", "Bit-Tech", "Overclock3D", "KitGuru",
  "Phoronix", "LinuxInsider", "LWN", "OMG!Ubuntu!", "LinuxJournal",
  "FOSSbytes", "ItsFOSS", "Unixmen", "Techaeris", "Ubergizmo", 
  "SlashGear", "PocketLint", "TrustedReviews", "Stuff", "T3"
];

const SourceFilter = ({ onSourceSelect, selectedSource }) => {
  const [sources, setSources] = useState([...TOP_100_SOURCES]);

  useEffect(() => {
    const loadSources = async () => {
      try {
        const data = await fetchSources();
        if (data && data.sources && data.sources.length > 0) {
          const apiSources = data.sources.map(s => typeof s === 'string' ? s : (s.name || s._id));
          const combined = Array.from(new Set([...apiSources, ...TOP_100_SOURCES]));
          setSources(combined); 
        }
      } catch (error) {
        console.error('Error loading sources:', error);
      }
    };
    loadSources();
  }, []);

  const handleSourceClick = (source) => {
    if (selectedSource === source) {
      onSourceSelect('');
    } else {
      onSourceSelect(source);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
        <Newspaper size={16} className="text-light-accent dark:text-dark-accent" />
        Top 100+ Sources
      </h3>
      <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-light-border dark:scrollbar-thumb-dark-border">
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 transform ${
            selectedSource === ''
              ? 'bg-light-accent dark:bg-dark-accent text-white shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
          }`}
          onClick={() => onSourceSelect('')}
        >
          All Sources
        </button>
        {sources.map((sourceObj) => {
          const sourceName = typeof sourceObj === 'string' ? sourceObj : (sourceObj.name || sourceObj._id);
          return (
            <button
              key={sourceName}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 transform ${
                selectedSource === sourceName
                  ? 'bg-light-accent dark:bg-dark-accent text-white shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
              onClick={() => handleSourceClick(sourceName)}
            >
              {sourceName}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default SourceFilter;
