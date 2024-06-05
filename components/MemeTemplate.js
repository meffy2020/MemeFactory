// components/MemeTemplate.js
export default function MemeTemplate({ template, inputs, handleInputChange }) {
    if (template === 'drama') {
      return (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="text"
              name="date"
              value={inputs.date}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Caption</label>
            <input
              type="text"
              name="caption"
              value={inputs.caption}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      );
    }
  
    // Add more template input fields for other templates as needed
    return null;
  }
  