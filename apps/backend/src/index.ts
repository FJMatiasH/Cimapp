import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes';
import { errorHandler } from './middlewares/error.middleware';

// Cargar variables de entorno desde la raíz del monorepo y desde apps/backend
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Servir la carpeta de imágenes raíz de manera estática
app.use('/assets/imagenes', express.static(path.resolve(process.cwd(), 'assets/imagenes')));
app.use('/assets/imagenes', express.static(path.resolve(__dirname, '../../../assets/imagenes')));

// Ruta base informativa
app.get('/', (req, res) => {
  res.json({
    name: 'Cimapp API',
    description: 'Servidor backend de cimas de montaña de España',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      cimas: '/api/cimas',
      userLists: '/api/user-lists',
      recommendations: '/api/recommendations'
    }
  });
});

// Montar router API bajo /api
app.use('/api', apiRoutes);

// Manejador global de errores
app.use(errorHandler);

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`[Cimapp Backend] Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(`[Cimapp Backend] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[Cimapp Backend] Catálogo cimas: http://localhost:${PORT}/api/cimas`);
});

export default app;
export { server };
