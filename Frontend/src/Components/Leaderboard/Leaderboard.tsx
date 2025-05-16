import React from "react";
import { Participant } from "../../api";

type Props = {
  participants: Participant[];
};

const getMedalEmoji = (index: number) => {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return `${index + 1}`;
  }
};

const configs: {
  label: string;
  render: (participant: Participant, index: number) => React.ReactNode;
}[] = [
  {
    label: "Place",
    render: (_participant, index) => getMedalEmoji(index),
  },
  {
    label: "Name",
    render: (participant) => participant.name,
  },
  {
    label: "Score",
    render: (participant) => participant.score,
  },
  {
    label: "Time Taken",
    render: (participant) => {
      const totalSeconds = participant.timeTaken ?? 0;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}m ${seconds}s`;
    },
  },
];

const ScoreTable: React.FC<Props> = ({ participants }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full bg-white text-gray-800 text-sm md:text-base">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {configs.map((col, index) => (
              <th key={index} className="px-4 py-3 text-left font-semibold tracking-wide">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, rowIndex) => (
            <tr
              key={participant.participantId ?? rowIndex}
              className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              {configs.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3 border-b border-gray-200">
                  {col.render(participant, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
