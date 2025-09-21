import React, { useState, useEffect } from 'react';
import { Search, Car, Ruler, Settings, GitCompare } from 'lucide-react';

// Sample car data - you can expand this or connect to a real database
const sampleCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2024,
    category: "Sedan",
    dimensions: {
      length: 4885,
      width: 1840,
      height: 1445,
      wheelbase: 2825,
      groundClearance: 155,
      curbWeight: 1570
    },
    wheels: {
      rimSize: 18,
      tireWidth: 235,
      aspectRatio: 45,
      boltPattern: "5x114.3"
    },
    interior: {
      headroom: 975,
      legroom: 1067,
      trunkCapacity: 428
    }
  },
  {
    id: 2,
    make: "BMW",
    model: "X5",
    year: 2024,
    category: "SUV",
    dimensions: {
      length: 4922,
      width: 2004,
      height: 1745,
      wheelbase: 2975,
      groundClearance: 244,
      curbWeight: 2205
    },
    wheels: {
      rimSize: 20,
      tireWidth: 275,
      aspectRatio: 40,
      boltPattern: "5x120"
    },
    interior: {
      headroom: 1030,
      legroom: 1027,
      trunkCapacity: 650
    }
  },
  {
    id: 3,
    make: "Ford",
    model: "F-150",
    year: 2024,
    category: "Truck",
    dimensions: {
      length: 5915,
      width: 2029,
      height: 1967,
      wheelbase: 3685,
      groundClearance: 232,
      curbWeight: 2090
    },
    wheels: {
      rimSize: 18,
      tireWidth: 275,
      aspectRatio: 65,
      boltPattern: "6x135"
    },
    interior: {
      headroom: 1035,
      legroom: 1092,
      trunkCapacity: 1704
    }
  },
  {
    id: 4,
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    category: "Sedan",
    dimensions: {
      length: 4694,
      width: 1849,
      height: 1443,
      wheelbase: 2875,
      groundClearance: 140,
      curbWeight: 1847
    },
    wheels: {
      rimSize: 19,
      tireWidth: 235,
      aspectRatio: 40,
      boltPattern: "5x114.3"
    },
    interior: {
      headroom: 1043,
      legroom: 1063,
      trunkCapacity: 425
    }
  }
];

const CarCard = ({ car, onCompare, isSelected }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{car.make} {car.model}</h3>
          <p className="text-gray-600">{car.year} • {car.category}</p>
        </div>
        <button
          onClick={() => onCompare(car)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${isSelected
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-blue-100 text-gray-700'
            }`}
        >
          {isSelected ? 'Selected' : 'Compare'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
            <Ruler className="w-4 h-4 mr-1" />
            Dimensions (mm)
          </h4>
          <div className="space-y-1 text-sm">
            <div>Length: <span className="font-medium">{car.dimensions.length}</span></div>
            <div>Width: <span className="font-medium">{car.dimensions.width}</span></div>
            <div>Height: <span className="font-medium">{car.dimensions.height}</span></div>
            <div>Wheelbase: <span className="font-medium">{car.dimensions.wheelbase}</span></div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
            <Settings className="w-4 h-4 mr-1" />
            Wheels & Weight
          </h4>
          <div className="space-y-1 text-sm">
            <div>Rim Size: <span className="font-medium">{car.wheels.rimSize}"</span></div>
            <div>Tire: <span className="font-medium">{car.wheels.tireWidth}/{car.wheels.aspectRatio}</span></div>
            <div>Weight: <span className="font-medium">{car.dimensions.curbWeight} kg</span></div>
            <div>Ground Clearance: <span className="font-medium">{car.dimensions.groundClearance} mm</span></div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2">Interior & Storage</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>Headroom: <span className="font-medium">{car.interior.headroom} mm</span></div>
          <div>Legroom: <span className="font-medium">{car.interior.legroom} mm</span></div>
          <div>Trunk: <span className="font-medium">{car.interior.trunkCapacity} L</span></div>
        </div>
      </div>
    </div>
  );
};

const ComparisonModal = ({ cars, onClose }) => {
  if (!cars.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Compare Vehicles</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <div key={car.id} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3">{car.make} {car.model} {car.year}</h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">EXTERIOR DIMENSIONS</h4>
                    <div className="space-y-1 text-sm">
                      <div>Length: {car.dimensions.length} mm</div>
                      <div>Width: {car.dimensions.width} mm</div>
                      <div>Height: {car.dimensions.height} mm</div>
                      <div>Wheelbase: {car.dimensions.wheelbase} mm</div>
                      <div>Ground Clearance: {car.dimensions.groundClearance} mm</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">WHEELS & WEIGHT</h4>
                    <div className="space-y-1 text-sm">
                      <div>Rim Size: {car.wheels.rimSize}"</div>
                      <div>Tire Size: {car.wheels.tireWidth}/{car.wheels.aspectRatio}</div>
                      <div>Bolt Pattern: {car.wheels.boltPattern}</div>
                      <div>Curb Weight: {car.dimensions.curbWeight} kg</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">INTERIOR</h4>
                    <div className="space-y-1 text-sm">
                      <div>Headroom: {car.interior.headroom} mm</div>
                      <div>Legroom: {car.interior.legroom} mm</div>
                      <div>Trunk Capacity: {car.interior.trunkCapacity} L</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CarDimensionsWebsite() {
  const [cars, setCars] = useState(sampleCars);
  const [filteredCars, setFilteredCars] = useState(sampleCars);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const categories = ['All', 'Sedan', 'SUV', 'Truck', 'Hatchback', 'Coupe'];

  useEffect(() => {
    let filtered = cars;

    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(car => car.category === categoryFilter);
    }

    setFilteredCars(filtered);
  }, [searchTerm, categoryFilter, cars]);

  const handleCompare = (car) => {
    if (compareList.find(c => c.id === car.id)) {
      setCompareList(compareList.filter(c => c.id !== car.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, car]);
    }
  };

  const isInCompareList = (car) => {
    return compareList.find(c => c.id === car.id) !== undefined;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Car Dimensions Database
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete specifications, dimensions, and technical details for all vehicle models
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by make or model..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {compareList.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <GitCompare className="w-5 h-5 mr-2" />
                Compare ({compareList.length})
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {cars.length} vehicles
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onCompare={handleCompare}
              isSelected={isInCompareList(car)}
            />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No vehicles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>Car Dimensions Database • Built with React • Deploy on Vercel</p>
          <p className="mt-2 text-sm">Sample data included - connect to your preferred database</p>
        </footer>

        {/* Comparison Modal */}
        {showComparison && (
          <ComparisonModal
            cars={compareList}
            onClose={() => setShowComparison(false)}
          />
        )}
      </div>
    </div>
  );
}