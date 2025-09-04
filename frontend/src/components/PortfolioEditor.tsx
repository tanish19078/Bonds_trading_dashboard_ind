import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PortfolioItem {
  id: string;
  issuer: string;
  type: string;
  maturity: string;
  yield: number;
  investment: number;
  currentValue: number;
  quantity: number;
  purchaseDate: string;
  notes?: string;
}

interface PortfolioEditorProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioItem[];
  onUpdatePortfolio: (data: PortfolioItem[]) => void;
}

export default function PortfolioEditor({ isOpen, onClose, portfolioData, onUpdatePortfolio }: PortfolioEditorProps) {
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});

  const handleAddNew = () => {
    setFormData({
      issuer: '',
      type: 'Corporate Bond',
      maturity: '',
      yield: 0,
      investment: 0,
      currentValue: 0,
      quantity: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsAddingNew(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData(item);
    setEditingItem(item);
  };

  const handleSave = () => {
    if (!formData.issuer || !formData.investment || !formData.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newItem: PortfolioItem = {
      id: editingItem?.id || Date.now().toString(),
      issuer: formData.issuer || '',
      type: formData.type || 'Corporate Bond',
      maturity: formData.maturity || '',
      yield: formData.yield || 0,
      investment: formData.investment || 0,
      currentValue: formData.currentValue || formData.investment || 0,
      quantity: formData.quantity || 0,
      purchaseDate: formData.purchaseDate || '',
      notes: formData.notes || ''
    };

    let updatedData;
    if (editingItem) {
      updatedData = portfolioData.map(item => 
        item.id === editingItem.id ? newItem : item
      );
    } else {
      updatedData = [...portfolioData, newItem];
    }

    onUpdatePortfolio(updatedData);
    setEditingItem(null);
    setIsAddingNew(false);
    setFormData({});
    toast.success(editingItem ? 'Bond updated successfully' : 'Bond added successfully');
  };

  const handleDelete = (id: string) => {
    const updatedData = portfolioData.filter(item => item.id !== id);
    onUpdatePortfolio(updatedData);
    toast.success('Bond removed from portfolio');
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    setFormData({});
  };

  const bondTypes = [
    'Government Bond',
    'Corporate Bond',
    'Municipal Bond',
    'Treasury Bill',
    'Convertible Bond',
    'Zero Coupon Bond'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Editor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Button */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Manage your bond portfolio with real-time data</p>
            <Button onClick={handleAddNew} className="bg-gradient-to-r from-green-500 to-emerald-500">
              <Plus className="w-4 h-4 mr-2" />
              Add New Bond
            </Button>
          </div>

          {/* Add/Edit Form */}
          {(isAddingNew || editingItem) && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">{editingItem ? 'Edit Bond' : 'Add New Bond'}</h3>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline">
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="issuer">Issuer *</Label>
                  <Input
                    id="issuer"
                    value={formData.issuer || ''}
                    onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                    placeholder="e.g., HDFC Bank, Reliance"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Bond Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bondTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maturity">Maturity Date</Label>
                  <Input
                    id="maturity"
                    type="date"
                    value={formData.maturity || ''}
                    onChange={(e) => setFormData({...formData, maturity: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="yield">Yield (%)</Label>
                  <Input
                    id="yield"
                    type="number"
                    step="0.1"
                    value={formData.yield || ''}
                    onChange={(e) => setFormData({...formData, yield: parseFloat(e.target.value) || 0})}
                    placeholder="7.5"
                  />
                </div>

                <div>
                  <Label htmlFor="investment">Investment Amount (₹) *</Label>
                  <Input
                    id="investment"
                    type="number"
                    value={formData.investment || ''}
                    onChange={(e) => setFormData({...formData, investment: parseFloat(e.target.value) || 0})}
                    placeholder="100000"
                  />
                </div>

                <div>
                  <Label htmlFor="currentValue">Current Value (₹)</Label>
                  <Input
                    id="currentValue"
                    type="number"
                    value={formData.currentValue || ''}
                    onChange={(e) => setFormData({...formData, currentValue: parseFloat(e.target.value) || 0})}
                    placeholder="105000"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({...formData, quantity: parseFloat(e.target.value) || 0})}
                    placeholder="100"
                  />
                </div>

                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate || ''}
                    onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes..."
                    className="h-20"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Portfolio Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {portfolioData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg">{item.issuer}</h4>
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Investment:</span>
                      <p>₹{item.investment.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Current Value:</span>
                      <p className={item.currentValue > item.investment ? 'text-green-600' : 'text-red-600'}>
                        ₹{item.currentValue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Yield:</span>
                      <p>{item.yield}%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <p>{item.quantity}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">P&L:</span>
                      <p className={item.currentValue > item.investment ? 'text-green-600' : 'text-red-600'}>
                        ₹{(item.currentValue - item.investment).toLocaleString()}
                        ({(((item.currentValue - item.investment) / item.investment) * 100).toFixed(1)}%)
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Maturity:</span>
                      <p>{item.maturity || 'N/A'}</p>
                    </div>
                  </div>

                  {item.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-gray-600 text-xs">Notes:</span>
                      <p className="text-sm text-gray-700 mt-1">{item.notes}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {portfolioData.length === 0 && !isAddingNew && (
            <Card className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Plus className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg text-gray-600 mb-2">No bonds in portfolio</h3>
              <p className="text-gray-500 mb-4">Add your first bond to start tracking your investments</p>
              <Button onClick={handleAddNew} className="bg-gradient-to-r from-blue-500 to-purple-500">
                Add Your First Bond
              </Button>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}