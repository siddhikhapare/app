//import { useState } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

type  FormField = {
  id?: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox';
  options: string[];
  required: boolean;
};

type FormType = {
  title: string;
  description?: string;
  fields: FormField[];
};

type ResponseData = {
  [fieldLabel: string]: string | boolean;
};

export default function ViewForm() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    //const [form, setForm] = useState<any>(null);
    const [form, setForm] = useState<FormType | null>(null);
    const [responses, setResponses] = useState<ResponseData>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
//   // Demo form data
//   const form = {
//     title: "Customer Feedback Survey",
//     description: "Help us improve our services by sharing your experience",
//     fields: [
//       { id: '1', label: 'Full Name', type: 'text' as const, options: [], required: true },
//       { id: '2', label: 'Email Address', type: 'email' as const, options: [], required: true },
//       { id: '3', label: 'Phone Number', type: 'number' as const, options: [], required: false },
//       { id: '4', label: 'Overall Experience', type: 'select' as const, options: ['Excellent', 'Good', 'Average', 'Poor'], required: true },
//       { id: '5', label: 'How did you hear about us?', type: 'radio' as const, options: ['Social Media', 'Friend/Family', 'Advertisement', 'Search Engine'], required: true },
//       { id: '6', label: 'Comments or Suggestions', type: 'textarea' as const, options: [], required: false },
//       { id: '7', label: 'Subscribe to newsletter', type: 'checkbox' as const, options: [], required: false },
//     ]
//   };

//   const [responses, setResponses] = useState<ResponseData>({});
    //   const [submitting, setSubmitting] = useState<boolean>(false);
    
    // ADD useEffect HERE (AFTER STATE DECLARATIONS)
    useEffect(() => {
        if (id) {
        fetchForm();
        }
    }, [id]);

    const fetchForm = async () => {
        try {
        setLoading(true);
        setError('');

        const response = await fetch(`http://localhost:5000/api/forms/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to load form');
        }

        if (data.success && data.form) {
            setForm(data.form);
        } else {
            throw new Error('Invalid response format');
        }
        } catch (err) {
        console.error('Failed to fetch form:', err);
        setError(err instanceof Error ? err.message : 'Failed to load form');
        } finally {
        setLoading(false);
        }
    };

    const handleChange = (fieldLabel: string, value: string | boolean) => {
        setResponses((prev) => ({ ...prev, [fieldLabel]: value }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/forms/${id}/responses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 1,
                responses: responses,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit response');
            }

            if (result.success) {
                alert('Response submitted successfully!');
                setResponses({});
                router.push('/');
            } else {
                throw new Error(result.error || 'Unknown error occurred');
            }
        } catch (err) {
            console.error('Error submitting response:', err);
            setError(err instanceof Error ? err.message : 'Failed to submit response');
        } finally {
            setSubmitting(false);
        }
    };

    // ADD LOADING STATE CHECK HERE (REPLACE YOUR ENTIRE return STATEMENT)
    if (loading) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
            <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 font-medium">Loading form...</p>
            </div>
        </div>
        );
    }

    if (error || !form) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center max-w-md">
            <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Form Not Found</h2>
            <p className="text-slate-600 mb-6">{error || 'The form you are looking for does not exist.'}</p>
            <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold"
            >
                Go to Home
            </button>
            </div>
        </div>
        );
    }

//   const handleSubmit = () => {
//     setSubmitting(true);
//     setTimeout(() => {
//       alert('Response submitted successfully! (Demo mode)');
//       console.log('Form responses:', responses);
//       setSubmitting(false);
//       setResponses({});
//     }, 1000);
//   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Flower Climber - Left Side */}
      <div className="fixed left-0 top-0 h-full w-20 pointer-events-none opacity-40 z-0">
        <svg className="h-full w-full" viewBox="0 0 100 800" fill="none">
          {/* Main Vine */}
          <path
            d="M 50 0 Q 30 100 50 200 Q 70 300 50 400 Q 30 500 50 600 Q 70 700 50 800"
            stroke="#059669"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
          
          {/* Leaves */}
          <ellipse cx="35" cy="80" rx="12" ry="20" fill="#10b981" transform="rotate(-30 35 80)" />
          <ellipse cx="65" cy="150" rx="12" ry="20" fill="#059669" transform="rotate(30 65 150)" />
          <ellipse cx="30" cy="250" rx="14" ry="22" fill="#10b981" transform="rotate(-25 30 250)" />
          <ellipse cx="70" cy="320" rx="12" ry="20" fill="#059669" transform="rotate(35 70 320)" />
          <ellipse cx="32" cy="420" rx="13" ry="21" fill="#10b981" transform="rotate(-30 32 420)" />
          <ellipse cx="68" cy="490" rx="12" ry="20" fill="#059669" transform="rotate(28 68 490)" />
          <ellipse cx="35" cy="580" rx="14" ry="22" fill="#10b981" transform="rotate(-32 35 580)" />
          <ellipse cx="65" cy="670" rx="12" ry="20" fill="#059669" transform="rotate(30 65 670)" />
          
          {/* Flowers */}
          <g transform="translate(40, 120)">
            <circle cx="0" cy="0" r="8" fill="#ec4899" opacity="0.9" />
            <circle cx="-6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="-4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#fbbf24" />
          </g>
          
          <g transform="translate(55, 280)">
            <circle cx="0" cy="0" r="7" fill="#a855f7" opacity="0.9" />
            <circle cx="-5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="-3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="0" cy="0" r="2" fill="#fbbf24" />
          </g>
          
          <g transform="translate(45, 450)">
            <circle cx="0" cy="0" r="8" fill="#ec4899" opacity="0.9" />
            <circle cx="-6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="-4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#fbbf24" />
          </g>
          
          <g transform="translate(60, 620)">
            <circle cx="0" cy="0" r="7" fill="#a855f7" opacity="0.9" />
            <circle cx="-5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="-3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="0" cy="0" r="2" fill="#fbbf24" />
          </g>
        </svg>
      </div>

      {/* Decorative Flower Climber - Right Side */}
      <div className="fixed right-0 top-0 h-full w-20 pointer-events-none opacity-40 z-0">
        <svg className="h-full w-full" viewBox="0 0 100 800" fill="none">
          {/* Main Vine */}
          <path
            d="M 50 0 Q 70 100 50 200 Q 30 300 50 400 Q 70 500 50 600 Q 30 700 50 800"
            stroke="#059669"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
          
          {/* Leaves */}
          <ellipse cx="65" cy="90" rx="12" ry="20" fill="#10b981" transform="rotate(30 65 90)" />
          <ellipse cx="35" cy="170" rx="12" ry="20" fill="#059669" transform="rotate(-30 35 170)" />
          <ellipse cx="70" cy="260" rx="14" ry="22" fill="#10b981" transform="rotate(25 70 260)" />
          <ellipse cx="30" cy="340" rx="12" ry="20" fill="#059669" transform="rotate(-35 30 340)" />
          <ellipse cx="68" cy="440" rx="13" ry="21" fill="#10b981" transform="rotate(30 68 440)" />
          <ellipse cx="32" cy="510" rx="12" ry="20" fill="#059669" transform="rotate(-28 32 510)" />
          <ellipse cx="65" cy="600" rx="14" ry="22" fill="#10b981" transform="rotate(32 65 600)" />
          <ellipse cx="35" cy="690" rx="12" ry="20" fill="#059669" transform="rotate(-30 35 690)" />
          
          {/* Flowers */}
          <g transform="translate(60, 140)">
            <circle cx="0" cy="0" r="8" fill="#ec4899" opacity="0.9" />
            <circle cx="-6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="-4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#fbbf24" />
          </g>
          
          <g transform="translate(45, 300)">
            <circle cx="0" cy="0" r="7" fill="#a855f7" opacity="0.9" />
            <circle cx="-5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="-3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="0" cy="0" r="2" fill="#fbbf24" />
          </g>
          
          <g transform="translate(55, 470)">
            <circle cx="0" cy="0" r="8" fill="#ec4899" opacity="0.9" />
            <circle cx="-6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="6" cy="-3" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="-4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="4" cy="5" r="6" fill="#f472b6" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#fbbf24" />
          </g>
          
          <g transform="translate(40, 640)">
            <circle cx="0" cy="0" r="7" fill="#a855f7" opacity="0.9" />
            <circle cx="-5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="5" cy="-2" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="-3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="3" cy="4" r="5" fill="#c084fc" opacity="0.8" />
            <circle cx="0" cy="0" r="2" fill="#fbbf24" />
          </g>
        </svg>
      </div>
      
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              {form.description}
            </p>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
            <h3 className="font-semibold text-red-800">Error</h3>
            <p className="text-sm text-red-600">{error}</p>
            </div>
        </div>
        )}
              
        {/* Main Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-emerald-100/50 p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            {form.fields.map((field) => (
              <div 
                key={field.id || field.label}
                className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-xl p-5 border-2 border-emerald-100 transition-all duration-200 hover:border-emerald-200"
              >
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {field.label}
                  {field.required && (
                    <span className="text-rose-500 ml-1 text-base">*</span>
                  )}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    value={(responses[field.label] as string) || ''}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 resize-none"
                    rows={4}
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={(responses[field.label] as string) || ''}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-800 cursor-pointer"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'radio' ? (
                  <div className="space-y-3">
                    {field.options.map((opt, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-white/70 transition-all"
                      >
                        <input
                          type="radio"
                          name={field.label}
                          value={opt}
                          checked={(responses[field.label] as string) === opt}
                          onChange={(e) => handleChange(field.label, e.target.value)}
                          className="w-5 h-5 text-emerald-600 border-2 border-emerald-300 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-slate-700 font-medium group-hover:text-emerald-600 transition-colors">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-white/70 transition-all w-fit">
                    <input
                      type="checkbox"
                      checked={(responses[field.label] as boolean) || false}
                      onChange={(e) => handleChange(field.label, e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-emerald-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium group-hover:text-emerald-600 transition-colors">
                      I agree
                    </span>
                  </label>
                ) : (
                  <input
                    type={field.type}
                    value={(responses[field.label] as string) || ''}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400"
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  />
                )}
              </div>
            ))}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-98"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting Response...
                </span>
              ) : (
                'Submit Response'
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Your response will be recorded securely
        </p>
      </div>
    </div>
  );
}