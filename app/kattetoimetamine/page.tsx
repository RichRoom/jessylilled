import type { Metadata } from 'next';
import PageLayout from '../../components/PageLayout';

export const metadata: Metadata = {
  title: 'Kättetoimetamine - Jessylilled',
  description: 'Jessylilled kättetoimetamise võimalused ja tingimused. Kuidas ja millal teie tellimus kohale jõuab.',
};

export default function KattetoimetaminePage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Kättetoimetamine</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              Sisu lisatakse varsti...
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
