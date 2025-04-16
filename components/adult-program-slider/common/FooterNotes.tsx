// components/adult-program-slider/common/FooterNotes.tsx
import React from 'react';

/**
 * Footer notes component shared between Best Sellers and More Programs slides
 * Displays important information about the driving programs
 */
const FooterNotes: React.FC = () => (
  <div className="text-sm text-gray-600 max-w-4xl mx-auto bg-gray-50 p-4 rounded-lg">
    <p className="mb-2">✓ All packages include the use of our modern, comfortable vehicle for your road test.</p>
    <p className="mb-2">✓ For Road Test, students must meet the instructor at the designated DMV location.</p>
    <p>
      ✓ A valid Learner's Permit is required to enroll in any of these packages.{' '}
      <a href="/permit-prep" className="text-emerald-600 hover:underline font-medium">
        Get permit help here!
      </a>
    </p>
  </div>
);

export default FooterNotes;