import { useState } from 'react';

type Field = {
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox';
  options: string;
  required: boolean;
};

type FieldKey = keyof Field;

export default function CreateForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { label: '', type: 'text', options: '', required: false },
    ]);
  };

  const updateField = (index: number, key: FieldKey, value: string | boolean) => {
    const updated = [...fields];
    updated[index][key] = value as never;
    setFields(updated);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title,
      description,
      user_id: 1,
      fields: fields.map((f) => ({
        ...f,
        options: f.options
          ? f.options.split(',').map((opt) => opt.trim())
          : [],
      })),
    };

    setTimeout(() => {
      alert('Form created successfully! (Demo mode)');
      setLoading(false);
      console.log('Form data:', formData);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Flower Climber - Left Side */}
      <div className="fixed left-0 top-0 h-full w-20 pointer-events-none opacity-40">
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
      <div className="fixed right-0 top-0 h-full w-20 pointer-events-none opacity-40">
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Create New Form
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Design your custom form with ease
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-emerald-100/50 p-6 sm:p-8 lg:p-10">
          <div className="space-y-6 sm:space-y-8">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Form Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter form title..."
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a brief description..."
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 resize-none"
                rows={3}
              />
            </div>

            {/* Form Fields Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Form Fields
                </h2>
                <span className="text-sm text-slate-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {fields.length} {fields.length === 1 ? 'field' : 'fields'}
                </span>
              </div>

              {/* Field Cards */}
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6 space-y-4 border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Field Label"
                      value={field.label}
                      onChange={(e) => updateField(index, 'label', e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white border-2 border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
                    />
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(index, 'type', e.target.value as Field['type'])
                      }
                      className="sm:w-40 px-4 py-2.5 bg-white border-2 border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-slate-700 cursor-pointer"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="number">Number</option>
                      <option value="textarea">Textarea</option>
                      <option value="select">Select</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="sm:w-auto w-full px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Options Input for Select/Radio */}
                  {(field.type === 'select' || field.type === 'radio') && (
                    <input
                      type="text"
                      placeholder="Options (comma-separated)"
                      value={field.options}
                      onChange={(e) => updateField(index, 'options', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
                    />
                  )}

                  {/* Required Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer group w-fit">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(index, 'required', e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-emerald-300 text-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 cursor-pointer transition-all"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                      Required field
                    </span>
                  </label>
                </div>
              ))}

              {/* Add Field Button */}
              <button
                type="button"
                onClick={addField}
                className="w-full px-6 py-4 border-3 border-dashed border-emerald-300 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 text-emerald-600 font-semibold flex items-center justify-center gap-2 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">+</span>
                <span>Add New Field</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-98"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Form...
                </span>
              ) : (
                'Create Form'
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        {/* <p className="text-center text-slate-500 text-sm mt-6">
          All fields are auto-saved as you type
        </p> */}
      </div>
    </div>
  );
}