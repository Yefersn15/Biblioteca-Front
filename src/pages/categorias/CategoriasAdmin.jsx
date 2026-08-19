import CatalogoCRUD from '../../components/CatalogoCRUD';
import * as api from '../../services/api/categorias.api';

const FIELDS = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea' },
];

const CategoriasAdmin = () => <CatalogoCRUD titulo="Categorías" api={api} fields={FIELDS} />;

export default CategoriasAdmin;
