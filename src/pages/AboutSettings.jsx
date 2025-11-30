// src/pages/AboutSettings.jsx
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/index.js';

const defaultStats = [
  { label: 'Clients', value: '100+', isDefaultHighlight: false, iconKey: 'users' },
  { label: 'Product', value: '11+', isDefaultHighlight: false, iconKey: 'shoppingBag' },
  { label: 'Top Brand', value: '1', isDefaultHighlight: true, iconKey: 'award' },
  { label: 'Worker', value: '22+', isDefaultHighlight: false, iconKey: 'userCheck' },
];

const AboutSettings = () => {
  const [loading, setLoading] = useState(true);

  const [sectionTitle, setSectionTitle] = useState('About Us');
  const [mainTitle, setMainTitle] = useState('Making Every Fabric Count');
  const [shortDescription, setShortDescription] = useState('');
  const [detailParagraphsText, setDetailParagraphsText] = useState(''); // multi-line text

  const [visionTitle, setVisionTitle] = useState('Our Vision');
  const [visionDescription, setVisionDescription] = useState('');
  const [missionTitle, setMissionTitle] = useState('Our Mission');
  const [missionDescription, setMissionDescription] = useState('');

  const [stats, setStats] = useState(defaultStats);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Load current about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await api.get('/about');
        if (data) {
          setSectionTitle(data.sectionTitle || 'About Us');
          setMainTitle(data.mainTitle || 'Making Every Fabric Count');
          setShortDescription(
            data.shortDescription ||
              'A Leading International Sourcing, Marketing Company Deals In Yarns, Fabrics, Garments, Fibers, Polyester Chips Textile Grade.'
          );

          if (Array.isArray(data.detailParagraphs)) {
            setDetailParagraphsText(data.detailParagraphs.join('\n\n'));
          }

          setVisionTitle(data.visionTitle || 'Our Vision');
          setVisionDescription(
            data.visionDescription ||
              'We prioritize customer satisfaction daily partnering closely, sharing market insights, providing technical support, and delivering the best offers with transparent, on-time communication and long-term relationships.'
          );

          setMissionTitle(data.missionTitle || 'Our Mission');
          setMissionDescription(
            data.missionDescription ||
              'We strive to deliver products that are not only well-made but also environmentally responsible and durable.'
          );

          if (Array.isArray(data.stats) && data.stats.length > 0) {
            setStats(data.stats);
          }

          if (data.imageSrc) {
            setImagePreview(data.imageSrc);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load About section data');
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleStatChange = (index, field, value) => {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const handleDefaultHighlightChange = (index) => {
    setStats((prev) =>
      prev.map((s, i) => ({ ...s, isDefaultHighlight: i === index }))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('sectionTitle', sectionTitle);
      formData.append('mainTitle', mainTitle);
      formData.append('shortDescription', shortDescription);
      formData.append('visionTitle', visionTitle);
      formData.append('visionDescription', visionDescription);
      formData.append('missionTitle', missionTitle);
      formData.append('missionDescription', missionDescription);

      // paragraphs => array
      const paragraphsArray = detailParagraphsText
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      formData.append('detailParagraphs', JSON.stringify(paragraphsArray));
      formData.append('stats', JSON.stringify(stats));

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const { data } = await api.post('/about', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('About section updated successfully');
      if (data.imageSrc) setImagePreview(data.imageSrc);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update About section');
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-slate-600">Loading About Section...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">About Section</h1>
      <p className="text-sm text-slate-500 mb-6">
        Update the content for the About Us section shown on your main website.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Basic Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Small Heading
            </label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Main Title
            </label>
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Short Description (above "Show More")
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Detail Paragraphs */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Detailed Paragraphs (Show More content)
          </label>
          <p className="text-xs text-slate-500 mb-1">
            Each blank line will be treated as a separate paragraph.
          </p>
          <textarea
            value={detailParagraphsText}
            onChange={(e) => setDetailParagraphsText(e.target.value)}
            rows={8}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Vision / Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vision Title
            </label>
            <input
              type="text"
              value={visionTitle}
              onChange={(e) => setVisionTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <label className="block text-sm font-medium text-slate-700 mb-1 mt-2">
              Vision Description
            </label>
            <textarea
              value={visionDescription}
              onChange={(e) => setVisionDescription(e.target.value)}
              rows={5}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Mission */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mission Title
            </label>
            <input
              type="text"
              value={missionTitle}
              onChange={(e) => setMissionTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <label className="block text-sm font-medium text-slate-700 mb-1 mt-2">
              Mission Description
            </label>
            <textarea
              value={missionDescription}
              onChange={(e) => setMissionDescription(e.target.value)}
              rows={5}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            Stats Cards
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            Update the label and value of each stat. Choose one default highlighted card.
          </p>
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border border-slate-200 rounded-md p-3"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) =>
                      handleStatChange(index, 'label', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) =>
                      handleStatChange(index, 'value', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Icon Key (fixed by dev)
                  </label>
                  <input
                    type="text"
                    value={stat.iconKey || ''}
                    onChange={(e) =>
                      handleStatChange(index, 'iconKey', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="users / shoppingBag / award / userCheck"
                  />
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center text-xs text-slate-700">
                    <input
                      type="radio"
                      name="defaultStat"
                      checked={stat.isDefaultHighlight}
                      onChange={() => handleDefaultHighlightChange(index)}
                      className="mr-2"
                    />
                    Default Highlight
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            About Image
          </label>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-md border border-slate-200"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Leave blank to keep the current image.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 text-sm font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutSettings;
