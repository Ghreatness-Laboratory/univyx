import React, { useState, useMemo } from 'react';
import { MapPin, Search, Navigation, X, Check, Building2, Compass, ShieldCheck } from 'lucide-react';
import { MOCK_CAMPUS_LOCATIONS, DEFAULT_RECENT_LOCATIONS, CampusLocation } from '../data/locations';

interface LocationPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation?: string;
  onSelectLocation: (locationName: string | undefined) => void;
  title?: string;
}

export const LocationPickerSheet: React.FC<LocationPickerSheetProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
  title = 'Select Campus Location'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'campus' | 'area'>('all');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [recentLocations, setRecentLocations] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('univyx_recent_locations');
      return saved ? JSON.parse(saved) : DEFAULT_RECENT_LOCATIONS;
    } catch {
      return DEFAULT_RECENT_LOCATIONS;
    }
  });

  const filteredLocations = useMemo(() => {
    return MOCK_CAMPUS_LOCATIONS.filter((loc) => {
      const matchesSearch =
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || loc.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const handlePick = (locName: string) => {
    // Add to recent locations
    const updated = [locName, ...recentLocations.filter((l) => l !== locName)].slice(0, 5);
    setRecentLocations(updated);
    try {
      localStorage.setItem('univyx_recent_locations', JSON.stringify(updated));
    } catch {}
    onSelectLocation(locName);
    onClose();
  };

  const handleUseCurrentArea = () => {
    setShowPermissionPrompt(true);
  };

  const confirmPermission = () => {
    setShowPermissionPrompt(false);
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      // Pick a mock nearby collegiate area
      const mockArea = 'Hebron Tech Quarter, Ota';
      handlePick(mockArea);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#16181C] rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1D9BF0]/10 flex items-center justify-center text-[#1D9BF0]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#0F1419] dark:text-[#E7E9EA]">
                {title}
              </h2>
              <p className="text-[12px] text-[#536471] dark:text-[#71767B]">
                Private university campuses & verified student areas only
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & "Use Current Area" */}
        <div className="p-4 space-y-3 border-b border-[#EFF3F4] dark:border-[#2F3336] bg-slate-50/50 dark:bg-black/20">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#536471] dark:text-[#71767B]" />
            <input
              type="text"
              placeholder="Search private campus or student area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-[14px] rounded-xl bg-white dark:bg-[#000000] border border-slate-200 dark:border-slate-800 text-[#0F1419] dark:text-[#E7E9EA] placeholder-[#536471] focus:outline-none focus:border-[#1D9BF0]"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleUseCurrentArea}
              disabled={isLocating}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1D9BF0]/10 hover:bg-[#1D9BF0]/15 text-[#1D9BF0] font-semibold text-[13px] border border-[#1D9BF0]/20 transition-colors cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Detecting area...' : 'Use my current area'}</span>
            </button>

            {selectedLocation && (
              <button
                onClick={() => {
                  onSelectLocation(undefined);
                  onClose();
                }}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-[13px] font-medium text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Clear Location
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-[#536471] dark:text-[#71767B] uppercase tracking-wider">
              Filter:
            </span>
            {(['all', 'campus', 'area'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#0F1419] text-white dark:bg-white dark:text-[#0F1419]'
                    : 'bg-slate-100 dark:bg-slate-800 text-[#536471] dark:text-[#71767B] hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat === 'campus' ? 'Campuses' : 'Nearby Areas'}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list of locations */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EFF3F4] dark:divide-[#2F3336] no-scrollbar">
          {/* Recent Locations Section */}
          {!searchQuery && categoryFilter === 'all' && recentLocations.length > 0 && (
            <div className="p-3 bg-slate-50/40 dark:bg-black/10">
              <span className="text-[11px] font-bold text-[#536471] dark:text-[#71767B] uppercase tracking-wider block px-2 mb-2">
                Recent Locations
              </span>
              <div className="flex flex-wrap gap-1.5 px-1">
                {recentLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handlePick(loc)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors cursor-pointer ${
                      selectedLocation === loc
                        ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0] font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#16181C] text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-[#1D9BF0]" />
                    <span className="truncate max-w-[200px]">{loc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location results */}
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc) => {
              const isSelected = selectedLocation === loc.name;
              return (
                <button
                  key={loc.id}
                  onClick={() => handlePick(loc.name)}
                  className={`w-full p-3.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group ${
                    isSelected ? 'bg-[#1D9BF0]/5 dark:bg-[#1D9BF0]/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        loc.category === 'campus'
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-[#1D9BF0]'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {loc.category === 'campus' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <Compass className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-[#0F1419] dark:text-[#E7E9EA] truncate">
                          {loc.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0 ${
                            loc.category === 'campus'
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-[#1D9BF0]'
                              : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {loc.category === 'campus' ? 'Campus' : 'Nearby Area'}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#536471] dark:text-[#71767B] truncate">
                        {loc.universityName} · {loc.state}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#1D9BF0] flex items-center justify-center text-white shrink-0 ml-2">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <MapPin className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-sm font-semibold">No campus or student area found</p>
              <p className="text-xs">
                Univyx only lists verified Nigerian private university campuses and surrounding student quarters.
              </p>
            </div>
          )}
        </div>

        {/* Footer info notice */}
        <div className="p-3 bg-slate-50 dark:bg-black/30 border-t border-[#EFF3F4] dark:border-[#2F3336] flex items-center gap-2 text-[11px] text-[#536471] dark:text-[#71767B]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>
            Privacy protected: Exact GPS coordinates and residential addresses are never shared.
          </span>
        </div>
      </div>

      {/* Simulated Browser Area Permission Dialog */}
      {showPermissionPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#16181C] rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#1D9BF0]/10 text-[#1D9BF0] mx-auto flex items-center justify-center">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              “Univyx” would like to use your general area
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We use your approximate collegiate area to display local campus gists, live rooms, and student marketplace deals. Exact GPS coordinates are never accessed.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowPermissionPrompt(false)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Don't Allow
              </button>
              <button
                onClick={confirmPermission}
                className="flex-1 py-2 px-3 rounded-xl bg-[#1D9BF0] text-white text-xs font-bold hover:bg-[#1A8CD8] shadow-sm"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
