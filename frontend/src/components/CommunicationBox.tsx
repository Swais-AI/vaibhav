import { useState } from 'react';
import { requestCall } from '../lib/api';

export default function CommunicationBox({ studentId }: { studentId: number }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      await requestCall(studentId, message);
      setStatus({ type: 'success', text: 'Call request sent successfully!' });
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', text: 'Failed to send request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        <span className="text-orange-500 text-xl">✉️</span>
        <h2 className="text-lg font-bold text-gray-800">Request Teacher Call</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Reason / Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="E.g., I would like to discuss my child's recent quiz performance."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 resize-none h-32 transition-shadow shadow-sm placeholder:text-gray-400 text-sm"
            disabled={isSubmitting}
          />
        </div>
        
        {status && (
          <div className={`p-3 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {status.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md w-full sm:w-auto self-end"
        >
          {isSubmitting ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </div>
  );
}
