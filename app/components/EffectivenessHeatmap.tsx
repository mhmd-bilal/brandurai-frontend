import React from 'react';

// Effectiveness data visualization component
const EffectivenessHeatmap = ({ roundData }) => {
  const audiences = Object.keys(roundData.audienceTypes);
  const channels = Object.keys(roundData.channelTypes);
  
  // Define color based on effectiveness percentage
  const getBackgroundColor = (value) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-green-300';
    if (value >= 40) return 'bg-yellow-300';
    return 'bg-red-300';
  };
  
  const getTextColor = (value) => {
    return value >= 60 ? 'text-white' : 'text-black';
  };
  
  return (
    <div className="mt-4 p-3 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-black mb-2">Audience-Channel Effectiveness</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100"></th>
              {channels.map(channel => (
                <th key={channel} className="border p-2 bg-gray-100 text-sm text-black">
                  {channel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {audiences.map(audience => (
              <tr key={audience}>
                <td className="border p-2 bg-gray-50 font-medium text-sm text-black">
                  {audience}
                </td>
                {channels.map(channel => {
                  const value = roundData.effectiveness[audience][channel];
                  return (
                    <td 
                      key={`${audience}-${channel}`}
                      className={`border p-2 text-center text-sm ${getBackgroundColor(value)} ${getTextColor(value)}`}
                    >
                      {value}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-2 gap-4 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
          <span>80-100%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-300 rounded-sm mr-1"></div>
          <span>60-79%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-300 rounded-sm mr-1"></div>
          <span>40-59%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-300 rounded-sm mr-1"></div>
          <span>0-39%</span>
        </div>
      </div>
    </div>
  );
};

export default EffectivenessHeatmap;