import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../../../store/slices/stats-slice';
import { addXp } from '../../../store/slices/user-slice';
import { BodyEntry } from '../../../types/stats';
import { toast } from 'sonner';

export const useAddEntry = (onComplete: () => void) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<BodyEntry>>({
    weight: 0,
    bmi: 0,
    bodyFatPercent: 0,
    bodyFatWeight: 0,
    skeletalMusclePercent: 0,
    skeletalMuscleWeight: 0,
    musclePercent: 0,
    muscleWeight: 0,
    waterPercent: 0,
    waterWeight: 0,
    visceralFat: 0,
    boneMass: 0,
    bmr: 0,
    proteinPercent: 0,
    obesityDegree: 0,
    metabolicAge: 0,
    fatFreeWeight: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'date' ? value : parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.weight || formData.weight <= 0) {
      toast.error("ERROR DE PROTOCOLO", {
        description: "El peso debe ser mayor a 0 para inicializar el registro."
      });
      return;
    }

    if (formData.weight > 500) {
      toast.error("LECTURA FUERA DE RANGO", {
        description: "El sensor detecta valores inusuales. Verifica los datos."
      });
      return;
    }

    const newEntry: BodyEntry = {
      ...(formData as BodyEntry),
      id: Date.now().toString(),
      date: new Date(formData.date + 'T12:00:00').toISOString(),
    };

    dispatch(addEntry(newEntry));
    dispatch(addXp(150)); 
    
    toast.success("BIO-DATOS CARGADOS", {
      description: "+150 XP Acumulados. Tu evolución continúa."
    });
    
    onComplete();
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
