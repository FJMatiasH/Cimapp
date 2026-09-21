import { Cima } from '../models/cima.model';

export const MOCK_CIMAS: Cima[] = [
  {
    id: 'teide',
    nombre: 'Pico del Teide',
    altitud: 3718,
    dificultad: 'Moderada',
    provincia: 'Santa Cruz de Tenerife',
    sistemaMontanoso: 'Islas Canarias / Tenerife',
    imagenes: [
      '/assets/imagenes/teide.jpg'
    ],
    descripcion: 'Estratovolcán y pico más alto de España y de todas las tierras emergidas del Atlántico. Su cumbre ofrece vistas irrepetibles del archipiélago canario sobre el mar de nubes. Requiere permiso administrativo previo del Parque Nacional para el sendero Telesforo Bravo hasta el cráter.',
    desnivelPositivo: 1500,
    coordenadas: {
      lat: 28.2723,
      lng: -16.6425
    }
  },
  {
    id: 'mulhacen',
    nombre: 'Mulhacén',
    altitud: 3479,
    dificultad: 'Moderada',
    provincia: 'Granada',
    sistemaMontanoso: 'Sierra Nevada',
    imagenes: [
      '/assets/imagenes/mulhacen.jpg'
    ],
    descripcion: 'Techo de la Península Ibérica. La ruta normal por la cara sur desde Capileira o la Hoya del Portillo no presenta dificultades técnicas en verano, pero su altitud y longitud demandan una excelente forma física. En invierno se transforma en un terreno riguroso de alta montaña invernal.',
    desnivelPositivo: 1350,
    coordenadas: {
      lat: 37.0531,
      lng: -3.3114
    }
  },
  {
    id: 'aneto',
    nombre: 'Pico Aneto',
    altitud: 3404,
    dificultad: 'Difícil',
    provincia: 'Huesca',
    sistemaMontanoso: 'Pirineos (Macizo de la Maladeta)',
    imagenes: [
      '/assets/imagenes/aneto.jpg'
    ],
    descripcion: 'La cumbre más elevada de la cordillera pirenaica. La ruta clásica parte del refugio de La Renclusa, atraviesa el glaciar del Aneto (obligatorio uso de crampones, piolet y casco en cualquier época) y culmina cruzando el célebre y aéreo Paso de Mahoma.',
    desnivelPositivo: 1500,
    coordenadas: {
      lat: 42.6322,
      lng: 0.6578
    }
  },
  {
    id: 'veleta',
    nombre: 'Pico Veleta',
    altitud: 3398,
    dificultad: 'Fácil',
    provincia: 'Granada',
    sistemaMontanoso: 'Sierra Nevada',
    imagenes: [
      '/assets/imagenes/veleta.jpg'
    ],
    descripcion: 'La segunda cumbre de Sierra Nevada y una de las ascensiones de más de 3.000 metros más amables de Europa durante el verano. Partiendo desde la Hoya de la Mora, se avanza por senderos o pistas cómodas, resultando ideal como cima de aclimatación o iniciación a la altitud.',
    desnivelPositivo: 870,
    coordenadas: {
      lat: 37.0561,
      lng: -3.3658
    }
  },
  {
    id: 'monte-perdido',
    nombre: 'Monte Perdido',
    altitud: 3355,
    dificultad: 'Difícil',
    provincia: 'Huesca',
    sistemaMontanoso: 'Pirineos (Parque Nacional de Ordesa y Monte Perdido)',
    imagenes: [
      '/assets/imagenes/monteperdido.jpg'
    ],
    descripcion: 'Pico calcáreo más alto de Europa, emblema del cañón de Ordesa. El ascenso desde el refugio de Góriz pasa por la Ciudad de Piedra y el lago Helado, concluyendo por el temido nevero de La Escupidera, donde es imperativo extremar la precaución ante caídas.',
    desnivelPositivo: 1200,
    coordenadas: {
      lat: 42.6756,
      lng: 0.0342
    }
  },
  {
    id: 'torre-cerredo',
    nombre: 'Torre Cerredo',
    altitud: 2648,
    dificultad: 'Difícil',
    provincia: 'Asturias / León',
    sistemaMontanoso: 'Picos de Europa (Macizo Central)',
    imagenes: [
      '/assets/imagenes/torrecerredo.jpg'
    ],
    descripcion: 'Techo absoluto de los Picos de Europa y de la Cordillera Cantábrica. Para alcanzar su cruz es necesario acometer una trepada final mantenida de grado II/II+ en roca caliza descompuesta donde no cabe el error ni el vértigo.',
    desnivelPositivo: 1400,
    coordenadas: {
      lat: 43.1978,
      lng: -4.8525
    }
  },
  {
    id: 'naranjo-de-bulnes',
    nombre: 'Picu Urriellu (Naranjo de Bulnes)',
    altitud: 2519,
    dificultad: 'Muy Difícil',
    provincia: 'Asturias',
    sistemaMontanoso: 'Picos de Europa',
    imagenes: [
      '/assets/imagenes/urriellu.jpg'
    ],
    descripcion: 'El gran mito de la escalada en España. Esta colosal mole de roca caliza naranja carece de sendero pedestre a la cumbre; su vía más asequible (la cara sur) exige escalada clásica de V- grado con varios largos de cuerda y rápeles para descender.',
    desnivelPositivo: 1100,
    coordenadas: {
      lat: 43.2017,
      lng: -4.8183
    }
  },
  {
    id: 'penalara',
    nombre: 'Peñalara',
    altitud: 2428,
    dificultad: 'Fácil',
    provincia: 'Madrid / Segovia',
    sistemaMontanoso: 'Sierra de Guadarrama',
    imagenes: [
      '/assets/imagenes/peñalara.jpg'
    ],
    descripcion: 'Cumbre máxima de la Sierra de Guadarrama y el Sistema Central entre Madrid y Segovia. La ascensión clásica parte del Puerto de Cotos por un sendero zigzagueante entre pinares y praderas alpinas hasta la cresta de Claveles y la cumbre.',
    desnivelPositivo: 600,
    coordenadas: {
      lat: 40.8508,
      lng: -3.9558
    }
  }
];
