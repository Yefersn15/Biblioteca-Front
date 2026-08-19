// src/pages/home/services/homeService.js
import * as bannersApi from '../../../services/api/banners.api';
import * as librosApi from '../../../services/api/libros.api';

export const getBanners = bannersApi.getBanners;
export const getLibrosPopulares = librosApi.getLibrosPopulares;
