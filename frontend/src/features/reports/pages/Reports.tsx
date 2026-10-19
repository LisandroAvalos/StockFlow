import LowStockReport from '../components/LowStockReport';
import SalesByPeriodReport from '../components/SalesByPeriodReport';
import BestSellingReport from '../components/BestSellingReport';

export default function Reports() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Reportes</h1>

      <div className="mt-6 space-y-10">
        <LowStockReport />
        <SalesByPeriodReport />
        <BestSellingReport />
      </div>
    </div>
  );
}
