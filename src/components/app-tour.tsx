import { Joyride } from 'react-joyride';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateProfile } from '../store/slices/user-slice';

interface AppTourProps {
  onTabChange: (tab: string) => void;
}

export const AppTour = ({ onTabChange }: AppTourProps) => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.user.settings);
  const JoyrideComponent = Joyride as any;
  
  const run = settings.notifications; 

  const steps: any[] = [
    {
      target: 'body',
      placement: 'center',
      title: '🧬 BIENVENIDO A BIOEVO',
      content: 'Tu sistema avanzado de evolución biológica ha sido inicializado. Permítenos guiarte a través de los protocolos de comando.',
      disableBeacon: true,
    },
    {
      target: '.step-dashboard-header',
      title: 'IDENTIDAD CONFIRMADA',
      content: 'Desde aquí supervisamos tu estatus de agente y el cronograma actual.',
    },
    {
      target: '.step-dashboard-level',
      title: 'NIVEL DE EVOLUCIÓN',
      content: 'Acumula puntos de experiencia (XP) registrando tus datos para subir de nivel y desbloquear nuevas capacidades.',
    },
    {
      target: '.step-dashboard-avatar',
      title: 'BIO-AVATAR',
      content: 'Tu representación digital. Haz clic en las esferas de datos para un análisis detallado de cada componente de tu cuerpo.',
    },
    {
      target: '[label="Registro"]',
      title: 'PROTOCOLO DE CARGA',
      content: 'Aquí es donde ingresas los nuevos datos capturados por tus sensores (balanza). Es vital para tu seguimiento.',
      placement: 'top',
    },
    {
        target: '[label="Historial"]',
        title: 'ARCHIVO DE MISIONES',
        content: 'Revisa tu línea temporal de registros. Puedes corregir datos erróneos o eliminar archivos corruptos.',
        placement: 'top',
    },
    {
      target: '[label="Perfil"]',
      title: 'CONFIGURACIÓN DE AGENTE',
      content: 'Ajusta tus parámetros base, como altura y peso meta, y admira tus Bio-Logros obtenidos.',
      placement: 'top',
    },
    {
      target: 'body',
      placement: 'center',
      title: 'MISIÓN INICIADA',
      content: 'Estás listo. Tu evolución comienza hoy. ¡Buena suerte, Agente!',
      disableBeacon: true,
    }
  ];

  const handleCallback = (data: any) => {
    const { status, index, action } = data;
    
    if (action === 'next' || action === 'prev') {
        if (index === 3) onTabChange('add');
        if (index === 4) onTabChange('history');
        if (index === 5) onTabChange('profile');
        if (index === 0 || index === 6) onTabChange('dashboard');
    }

    if (['finished', 'skipped'].includes(status)) {
      dispatch(updateProfile({ settings: { ...settings, notifications: false } }));
      onTabChange('dashboard');
    }
  };

  return (
    <>
        <style>{`
            .__joyride__tooltip {
                background-color: #0d1526 !important;
                border-radius: 24px !important;
                border: 1px solid rgba(0, 242, 255, 0.2) !important;
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 242, 255, 0.1) !important;
                padding: 24px !important;
            }
            .__joyride__spotlight {
                border-radius: 24px !important;
                border: 2px solid rgba(0, 242, 255, 0.3) !important;
            }
        `}</style>
        <JoyrideComponent
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        showSkipButton
        callback={handleCallback}
        styles={{
            options: {
                primaryColor: '#00f2ff',
                backgroundColor: '#0d1526', 
                textColor: '#fff',
                arrowColor: '#0d1526',
                overlayColor: 'rgba(5, 10, 20, 0.9)',
                zIndex: 1000,
            },
            tooltip: {
                backgroundColor: '#0d1526',
                borderRadius: '24px',
            },
            tooltipContainer: {
                textAlign: 'left',
            },
            tooltipTitle: {
                fontFamily: '"Orbitron", sans-serif',
                fontSize: '14px',
                fontWeight: '900',
                letterSpacing: '0.1em',
                marginBottom: '10px',
                color: '#00f2ff',
            },
            tooltipContent: {
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#a1a1aa',
            },
            buttonNext: {
                backgroundColor: '#00f2ff',
                color: '#050a14',
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: '900',
                textTransform: 'uppercase',
                fontSize: '11px',
                border: 'none',
                marginLeft: '12px',
            },
            buttonBack: {
                color: '#00f2ff',
                fontWeight: 'bold',
                fontSize: '11px',
                textTransform: 'uppercase',
            },
            buttonSkip: {
                color: '#6b7280',
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            }
        } as any}
        locale={{
            back: 'ANTERIOR',
            close: 'CERRAR',
            last: 'FINALIZAR',
            next: 'SIGUIENTE',
            skip: 'SALTAR TOUR',
        }}
        />
    </>
  );
};
