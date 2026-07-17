import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Building2, Briefcase, Check, ChevronLeft, Upload, File as FileIcon } from 'lucide-react';
import { useTheme } from '../context';
import { useNavigate } from 'react-router-dom';

type PropertyType = 'home' | 'commercial' | 'business' | '';

interface FormData {
  propertyType: PropertyType;
  homeSubtype: string;
  ownsHome: boolean | null;
  commercialSubtype: string;
  commercialSqft: string;
  businessSubtype: string;
  businessSqft: string;
  location: { formattedAddress: string; street: string; city: string; state: string; zip: string };
  name: string;
  phone: string;
  email: string;
  hearAboutUs: string;
  billFile: File | null;
}

export default function Quote() {
  const { isNight } = useTheme();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    homeSubtype: '',
    ownsHome: null,
    commercialSubtype: '',
    commercialSqft: '',
    businessSubtype: '',
    businessSqft: '',
    location: { formattedAddress: '', street: '', city: '', state: '', zip: '' },
    name: '', phone: '', email: '',
    hearAboutUs: '',
    billFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Validate Step 1
  const isStep1Valid = () => {
    if (!formData.propertyType) return false;
    if (formData.propertyType === 'home') {
      return formData.homeSubtype !== '' && formData.ownsHome !== null;
    }
    if (formData.propertyType === 'commercial') {
      return formData.commercialSubtype !== '' && formData.commercialSqft !== '';
    }
    if (formData.propertyType === 'business') {
      return formData.businessSubtype !== '' && formData.businessSqft !== '';
    }
    return false;
  };

  // Validate Step 2
  const isStep2Valid = () => {
    const { street, city, state, zip } = formData.location;
    return street.trim() !== '' && city.trim() !== '' && state.trim() !== '' && zip.trim() !== '';
  };

  // Validate Step 3
  const isStep3Valid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formData.name.trim() !== '' && formData.phone.trim() !== '' && emailRegex.test(formData.email);
  };

  const handleNext = () => {
    if (currentStep === 1 && isStep1Valid()) setCurrentStep(2);
    else if (currentStep === 2 && isStep2Valid()) setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  const handleSubmit = async () => {
    if (!isStep3Valid()) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'location') {
          Object.entries(value).forEach(([locKey, locValue]) => {
            data.append(locKey, locValue as string);
          });
        } else if (key === 'billFile' && value instanceof File) {
          data.append('billFile', value);
        } else {
          data.append(key, String(value));
        }
      });

      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request.');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = isNight ? '#07CCEA' : '#CEFE49';
  const accentClass = isNight ? 'bg-[#07CCEA] text-slate-950' : 'bg-[#CEFE49] text-[#1f2a1d]';
  const cardBgClass = isNight ? 'bg-[#1C1C1C] border border-white/5' : 'bg-white border border-black/5 shadow-sm';
  const textPrimaryClass = isNight ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isNight ? 'text-gray-400' : 'text-gray-500';
  const inputBgClass = isNight ? 'bg-black/50 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400';

  if (submitSuccess) {
    return (
      <div className={`relative flex-1 rounded-3xl sm:rounded-[32px] overflow-hidden ${isNight ? 'bg-slate-900' : 'bg-[#FAFAFA]'} flex flex-col pt-32 pb-16 px-6 isolate transition-colors duration-500 min-h-[70vh] flex items-center justify-center`}>
        <div className={`max-w-md w-full p-8 md:p-12 rounded-3xl ${cardBgClass} flex flex-col items-center text-center`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isNight ? 'bg-[#07CCEA]/20' : 'bg-[#CEFE49]/20'}`}>
            <Check className={`w-10 h-10 ${isNight ? 'text-[#07CCEA]' : 'text-[#CEFE49]'}`} />
          </div>
          <h2 className={`font-grotesk font-bold text-3xl mb-4 ${textPrimaryClass}`}>Request Received</h2>
          <p className={`${textSecondaryClass} mb-8`}>
            Thanks! We've received your request and will be in touch shortly to discuss your custom solar solution.
          </p>
          <button 
            onClick={() => navigate('/')}
            className={`font-bold px-8 py-3.5 rounded-full transition-transform hover:scale-[1.02] ${accentClass}`}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex-1 rounded-3xl sm:rounded-[32px] overflow-hidden ${isNight ? 'bg-slate-900' : 'bg-[#FAFAFA]'} flex flex-col pt-32 pb-16 px-4 sm:px-6 md:px-10 isolate transition-colors duration-500 min-h-[80vh]`}>
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-8">
        
        {/* Stepper Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className={`font-grotesk font-bold text-3xl sm:text-4xl ${textPrimaryClass}`}>Request a Quote</h1>
            <span className={`text-sm font-semibold ${isNight ? 'text-[#07CCEA]' : 'text-[#8EA815]'}`}>Step {currentStep} of 3</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`h-2 rounded-full flex-1 transition-colors duration-500 ${step <= currentStep ? (isNight ? 'bg-[#07CCEA]' : 'bg-[#CEFE49]') : (isNight ? 'bg-white/10' : 'bg-black/10')}`} />
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className={`p-6 sm:p-10 rounded-3xl transition-colors duration-500 ${cardBgClass}`}>
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col gap-2">
                <h2 className={`font-grotesk font-bold text-xl sm:text-2xl ${textPrimaryClass}`}>What type of property is this for?</h2>
                <p className={`text-sm ${textSecondaryClass}`}>Select the option that best describes your needs.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: 'home', label: 'Home', icon: HomeIcon },
                  { id: 'commercial', label: 'Commercial Space', icon: Building2 },
                  { id: 'business', label: 'Business Space', icon: Briefcase },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.propertyType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, propertyType: type.id as PropertyType, homeSubtype: '', ownsHome: null, commercialSubtype: '', commercialSqft: '', businessSubtype: '', businessSqft: '' })}
                      className={`flex flex-col items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? `border-[${accentColor}] ${isNight ? 'bg-[#07CCEA]/10' : 'bg-[#CEFE49]/20'}` 
                          : `${isNight ? 'border-white/5 hover:border-white/20 bg-white/5' : 'border-black/5 hover:border-black/20 bg-black/5'}`
                      }`}
                    >
                      <Icon className={`w-8 h-8 ${isSelected ? (isNight ? 'text-[#07CCEA]' : 'text-[#8EA815]') : textSecondaryClass}`} />
                      <span className={`font-semibold ${isSelected ? textPrimaryClass : textSecondaryClass}`}>{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {formData.propertyType === 'home' && (
                <div className="flex flex-col gap-6 pt-4 border-t border-gray-200 dark:border-white/10 animate-in fade-in duration-500">
                  <div className="flex flex-col gap-3">
                    <label className={`font-semibold ${textPrimaryClass}`}>What type of home is it?</label>
                    <div className="flex flex-wrap gap-2">
                      {['Apartment', 'Single-Story House', 'Double-Story House'].map(subtype => (
                        <button
                          key={subtype}
                          onClick={() => setFormData({ ...formData, homeSubtype: subtype })}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${formData.homeSubtype === subtype ? accentClass + ' border-transparent' : `${isNight ? 'border-white/20 text-gray-300 hover:border-white/40' : 'border-black/20 text-gray-600 hover:border-black/40'}`}`}
                        >
                          {subtype}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className={`font-semibold ${textPrimaryClass}`}>Do you own this property?</label>
                    <div className="flex gap-2">
                      {[true, false].map(val => (
                        <button
                          key={String(val)}
                          onClick={() => setFormData({ ...formData, ownsHome: val })}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border ${formData.ownsHome === val ? accentClass + ' border-transparent' : `${isNight ? 'border-white/20 text-gray-300 hover:border-white/40' : 'border-black/20 text-gray-600 hover:border-black/40'}`}`}
                        >
                          {val ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.propertyType === 'commercial' && (
                <div className="flex flex-col gap-6 pt-4 border-t border-gray-200 dark:border-white/10 animate-in fade-in duration-500">
                  <div className="flex flex-col gap-3">
                    <label className={`font-semibold ${textPrimaryClass}`}>What type of commercial space?</label>
                    <div className="flex flex-wrap gap-2">
                      {['Retail', 'Warehouse', 'Office Building', 'Other'].map(subtype => (
                        <button
                          key={subtype}
                          onClick={() => setFormData({ ...formData, commercialSubtype: subtype })}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${formData.commercialSubtype === subtype ? accentClass + ' border-transparent' : `${isNight ? 'border-white/20 text-gray-300 hover:border-white/40' : 'border-black/20 text-gray-600 hover:border-black/40'}`}`}
                        >
                          {subtype}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className={`font-semibold ${textPrimaryClass}`}>Approximate square footage</label>
                    <input
                      type="number"
                      placeholder="e.g., 5000"
                      value={formData.commercialSqft}
                      onChange={(e) => setFormData({ ...formData, commercialSqft: e.target.value })}
                      className={`w-full max-w-sm px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                </div>
              )}

              {formData.propertyType === 'business' && (
                <div className="flex flex-col gap-6 pt-4 border-t border-gray-200 dark:border-white/10 animate-in fade-in duration-500">
                  <div className="flex flex-col gap-3">
                    <label className={`font-semibold ${textPrimaryClass}`}>What type of business?</label>
                    <div className="flex flex-wrap gap-2">
                      {['Small Business', 'Franchise', 'Industrial', 'Other'].map(subtype => (
                        <button
                          key={subtype}
                          onClick={() => setFormData({ ...formData, businessSubtype: subtype })}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${formData.businessSubtype === subtype ? accentClass + ' border-transparent' : `${isNight ? 'border-white/20 text-gray-300 hover:border-white/40' : 'border-black/20 text-gray-600 hover:border-black/40'}`}`}
                        >
                          {subtype}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className={`font-semibold ${textPrimaryClass}`}>Approximate square footage</label>
                    <input
                      type="number"
                      placeholder="e.g., 2500"
                      value={formData.businessSqft}
                      onChange={(e) => setFormData({ ...formData, businessSqft: e.target.value })}
                      className={`w-full max-w-sm px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNext}
                  disabled={!isStep1Valid()}
                  className={`font-bold px-8 py-3.5 rounded-full transition-transform ${isStep1Valid() ? `${accentClass} hover:scale-[1.02] cursor-pointer` : `${isNight ? 'bg-white/10 text-white/40' : 'bg-black/5 text-black/30'} cursor-not-allowed`}`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <button onClick={handleBack} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isNight ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-gray-900'}`}>
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className={`font-grotesk font-bold text-xl sm:text-2xl ${textPrimaryClass}`}>Where is the property located?</h2>
              </div>

              <div className="flex flex-col gap-6 pl-0 sm:pl-14">
                <div className="flex flex-col gap-2">
                  <label className={`font-semibold ${textPrimaryClass}`}>Search Address</label>
                  <input
                    type="text"
                    placeholder="Start typing your address..."
                    value={formData.location.formattedAddress}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, formattedAddress: e.target.value } })}
                    className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                  />
                  <p className={`text-xs ${textSecondaryClass}`}>Since Maps API is not yet connected, you can enter your address details manually below.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className={`font-semibold text-sm ${textPrimaryClass}`}>Street Address</label>
                    <input
                      type="text"
                      value={formData.location.street}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, street: e.target.value } })}
                      className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`font-semibold text-sm ${textPrimaryClass}`}>City</label>
                    <input
                      type="text"
                      value={formData.location.city}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                      className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className={`font-semibold text-sm ${textPrimaryClass}`}>State/Region</label>
                      <input
                        type="text"
                        value={formData.location.state}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                        className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={`font-semibold text-sm ${textPrimaryClass}`}>ZIP/Postal Code</label>
                      <input
                        type="text"
                        value={formData.location.zip}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, zip: e.target.value } })}
                        className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNext}
                    disabled={!isStep2Valid()}
                    className={`font-bold px-8 py-3.5 rounded-full transition-transform ${isStep2Valid() ? `${accentClass} hover:scale-[1.02] cursor-pointer` : `${isNight ? 'bg-white/10 text-white/40' : 'bg-black/5 text-black/30'} cursor-not-allowed`}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <button onClick={handleBack} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isNight ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-gray-900'}`}>
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className={`font-grotesk font-bold text-xl sm:text-2xl ${textPrimaryClass}`}>Contact Info & Bill Upload</h2>
              </div>

              <div className="flex flex-col gap-6 pl-0 sm:pl-14">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className={`font-semibold text-sm ${textPrimaryClass}`}>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`font-semibold text-sm ${textPrimaryClass}`}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className={`font-semibold text-sm ${textPrimaryClass}`}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all ${inputBgClass}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className={`font-semibold text-sm ${textPrimaryClass}`}>How did you hear about us? <span className="text-xs font-normal opacity-70">(Optional)</span></label>
                    <select
                      value={formData.hearAboutUs}
                      onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl outline-none focus:ring-2 ${isNight ? 'focus:ring-[#07CCEA]' : 'focus:ring-[#CEFE49]'} border transition-all appearance-none ${inputBgClass}`}
                    >
                      <option value="">Select an option</option>
                      <option value="Google">Google</option>
                      <option value="Referral">Referral</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className={`font-semibold text-sm ${textPrimaryClass}`}>Upload your most recent electricity bill <span className="text-xs font-normal opacity-70">(Optional)</span></label>
                  <label className={`mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${isNight ? 'border-white/20 hover:bg-white/5 hover:border-[#07CCEA]' : 'border-black/20 hover:bg-black/5 hover:border-[#CEFE49]'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {formData.billFile ? (
                        <>
                          <FileIcon className={`w-8 h-8 mb-2 ${isNight ? 'text-[#07CCEA]' : 'text-[#8EA815]'}`} />
                          <p className={`text-sm font-semibold ${textPrimaryClass}`}>{formData.billFile.name}</p>
                        </>
                      ) : (
                        <>
                          <Upload className={`w-6 h-6 mb-2 ${textSecondaryClass}`} />
                          <p className={`text-sm ${textSecondaryClass}`}>PDF or image</p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          if (file.size > 5 * 1024 * 1024) {
                            setSubmitError('File size exceeds 5MB limit. Please upload a smaller file.');
                            setFormData({ ...formData, billFile: null });
                            return;
                          }
                          setSubmitError('');
                          setFormData({ ...formData, billFile: file });
                        }
                      }}
                    />
                  </label>
                </div>

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mt-2">
                    {submitError}
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep3Valid() || isSubmitting}
                    className={`font-bold px-8 py-3.5 rounded-full transition-transform ${isStep3Valid() && !isSubmitting ? `${accentClass} hover:scale-[1.02] cursor-pointer` : `${isNight ? 'bg-white/10 text-white/40' : 'bg-black/5 text-black/30'} cursor-not-allowed`} flex items-center gap-2`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    ) : null}
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
