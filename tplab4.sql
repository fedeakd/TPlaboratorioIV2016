-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2017 a las 09:03:00
-- Versión del servidor: 5.6.22-log
-- Versión de PHP: 5.5.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tplab4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `idCargo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`idCargo`, `nombre`) VALUES
(1, 'cliente'),
(2, 'empleado'),
(3, 'encargado'),
(4, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `domicilio` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `documento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `nombre`, `apellido`, `ciudad`, `domicilio`, `fechaNacimiento`, `documento`) VALUES
(1, 'Federico', 'Santamaria', 'Banfield', 'Berutti 2077', '1993-12-27', 37978272),
(14, 'cliente', 'cliente', 'cliente', 'cliente', '2015-10-24', 12345679),
(15, 'federico', 'santamaria', 'Banfield', 'Berutti 2077', '2015-10-09', 37978272),
(17, 'federico', 'santamaria', 'Banfield', 'Berutti 2077', '2015-10-09', 37978272),
(31, 'federico', 'santamaria', 'Banfield', 'Berutti 2077', '1993-10-09', 37978272);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `idempleado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `sueldo` float NOT NULL,
  `idLocal` int(11) DEFAULT NULL,
  `documento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`idempleado`, `nombre`, `apellido`, `fechaNacimiento`, `sueldo`, `idLocal`, `documento`) VALUES
(16, 'jose', 'sinEmpleo', '2015-10-09', 1234, NULL, 1234567),
(18, 'jose', 'sinEmpleo', '2015-10-09', 1234, NULL, 1234567),
(19, 'jose', 'sinEmpleo', '2015-10-09', 1234, NULL, 1234567),
(20, 'jose', 'sinEmpleo', '2015-10-09', 1234, NULL, 1234567),
(21, 'jose', 'sinEmpleo', '2015-10-09', 1234, 15, 1234567),
(22, 'jose', 'sinEmpleo', '2015-10-09', 1234, NULL, 1234567),
(23, 'jose', 'sinEmpleo', '2015-10-09', 1234, 17, 1234567),
(32, 'jose', 'sinEmpleo', '2015-10-09', 1234, 16, 1234567),
(33, 'empleado', 'empleado', '1883-12-12', 1234, 17, 1234567),
(34, 'encargado', 'encargado', '1883-12-12', 1234, 16, 1234567),
(35, 'administrador', 'administrador', '1993-12-12', 1234, NULL, 1234567),
(36, 'encargodo2', 'encargado2', '1993-02-12', 1234, 17, 1234567);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `idEstado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`idEstado`, `nombre`) VALUES
(1, 'activo'),
(2, 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `idLocal` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `foto1` varchar(50) NOT NULL,
  `foto2` varchar(50) NOT NULL,
  `foto3` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`idLocal`, `nombre`, `direccion`, `foto1`, `foto2`, `foto3`) VALUES
(15, 'Muzzarela', 'Antonio Berutti 2077, B1828HOO Villa Centenario, Buenos Aires, Argentina', 'local20170213_215033 0.jpg', 'local20170213_215033 1.jpg', 'local20170213_215033 2.jpg'),
(16, 'Pizzeria Matrix', 'Lanús Este, Buenos Aires, Argentina', 'local20170214_200604 0.jpg', 'local20170214_200604 1.jpg', 'local20170214_200604 2.jpg'),
(17, 'Matrix recargado', 'Buenos Aires, CABA, Argentina', 'local20170214_200719 0.jpg', 'local20170214_200719 1.jpg', 'local20170214_200719 2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localesofertas`
--

CREATE TABLE `localesofertas` (
  `idLocalOferta` int(11) NOT NULL,
  `idLocal` int(11) NOT NULL,
  `idOferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `localesofertas`
--

INSERT INTO `localesofertas` (`idLocalOferta`, `idLocal`, `idOferta`) VALUES
(6, 15, 25),
(7, 15, 26),
(8, 16, 25),
(9, 16, 26),
(10, 16, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localesprodu`
--

CREATE TABLE `localesprodu` (
  `idLocalProdu` int(11) NOT NULL,
  `idLocal` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `localesprodu`
--

INSERT INTO `localesprodu` (`idLocalProdu`, `idLocal`, `idProducto`) VALUES
(24, 15, 8),
(25, 15, 10),
(26, 15, 11),
(27, 15, 12),
(28, 15, 13),
(29, 16, 8),
(30, 16, 10),
(31, 16, 11),
(32, 16, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `idOferta` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `precio` varchar(50) NOT NULL,
  `foto1` varchar(50) NOT NULL,
  `foto2` varchar(50) NOT NULL,
  `foto3` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`idOferta`, `nombre`, `fecha`, `precio`, `foto1`, `foto2`, `foto3`) VALUES
(25, '2 pizza y una empanada', '2015-10-09', '200', 'oferta20170210_164339 0.jpg', 'oferta20170210_164339 1.jpg', 'oferta20170210_164339 2.jpg'),
(26, 'Muzzareelax2   coca cola', '2015-10-09', '400', 'oferta20170212_211257 0.jpg', 'oferta20170212_211257 1.jpg', 'oferta20170212_211257 2.jpg'),
(27, '1 pepsi   una milapizza  muzzarela', '2015-10-09', '300', 'oferta20170214_162313 0.jpg', 'oferta20170214_162313 1.jpg', 'oferta20170214_162313 2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertasproductos`
--

CREATE TABLE `ofertasproductos` (
  `idOferta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ofertasproductos`
--

INSERT INTO `ofertasproductos` (`idOferta`, `idProducto`, `cantidad`) VALUES
(25, 8, 0),
(25, 11, 0),
(25, 10, 0),
(26, 11, 0),
(26, 8, 0),
(26, 12, 0),
(27, 14, 1),
(27, 15, 1),
(27, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `idLocal` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `fecha`, `direccion`, `idLocal`, `idCliente`, `precio`) VALUES
(2, '2017-02-14', 'Bancalari, Victoria, Buenos Aires, Argentina', 15, 1, 1498),
(3, '2017-02-14', 'AccesoDatos', 15, 1, 1912),
(4, '2017-02-14', 'Timoteo Gordillo, Villa Centenario, Buenos Aires, Argentina', 15, 1, 1912),
(5, '2017-02-14', 'Banfield, Buenos Aires, Argentina', 16, 1, 800),
(6, '2017-02-14', 'Buenos Aires, CABA, Argentina', 16, 1, 1200),
(7, '2017-02-14', 'Bahía Blanca, Buenos Aires, Argentina', 16, 1, 600),
(8, '2017-02-15', 'Banfield, Buenos Aires, Argentina', 16, 14, 180),
(9, '2017-02-15', 'San Cristobal, CABA, Argentina', 16, 1, 56),
(10, '2017-02-17', 'Lomas de Zamora, Buenos Aires, Argentina', 15, 14, 1400);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosofertas`
--

CREATE TABLE `pedidosofertas` (
  `idPedidoOferta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `idOferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedidosofertas`
--

INSERT INTO `pedidosofertas` (`idPedidoOferta`, `cantidad`, `idPedido`, `idOferta`) VALUES
(1, 3, 2, 25),
(2, 2, 2, 26),
(3, 3, 3, 25),
(4, 3, 3, 26),
(5, 3, 4, 25),
(6, 3, 4, 26),
(7, 2, 5, 26),
(8, 3, 6, 26),
(9, 2, 7, 27),
(10, 3, 10, 25),
(11, 2, 10, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosproductos`
--

CREATE TABLE `pedidosproductos` (
  `idPedidoProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedidosproductos`
--

INSERT INTO `pedidosproductos` (`idPedidoProducto`, `cantidad`, `idPedido`, `idProducto`) VALUES
(1, 4, 2, 8),
(2, 3, 2, 10),
(3, 4, 3, 10),
(4, 4, 3, 8),
(5, 4, 4, 10),
(6, 4, 4, 8),
(7, 2, 8, 8),
(8, 2, 8, 10),
(9, 2, 8, 11),
(10, 2, 8, 14),
(11, 2, 9, 8),
(12, 2, 9, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `domicilio` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `documento` int(11) NOT NULL,
  `cargo` enum('Administrador','Encargador','Empleado','cliente') NOT NULL,
  `estado` enum('Activo','Inactivo') DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `fechaRegistro` date NOT NULL,
  `ciudad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idPersona`, `nombre`, `apellido`, `domicilio`, `fechaNacimiento`, `documento`, `cargo`, `estado`, `usuario`, `clave`, `mail`, `fechaRegistro`, `ciudad`) VALUES
(1, 'federico', 'santamaria', 'Berutti 2077', '2010-10-10', 37978272, 'cliente', 'Activo', 'binomio', '1234', 'soii_fede@hotmail.com', '2010-10-10', 'Banfield'),
(2, 'federico', 'santamaria', 'Berutti 2077', '2010-10-10', 37978272, 'cliente', 'Activo', 'binomio', '1234', 'soii_fede@hotmail.com', '2017-01-20', 'Banfield'),
(3, 'federico', 'santamaria', 'Berutti 2077', '2015-10-09', 37978272, 'cliente', 'Activo', 'binomio', '1234', 'soii_fede@hotmail.com', '2017-01-20', 'Banfield'),
(4, 'federico', 'santamaria', 'Berutti 2077', '2015-10-09', 37978272, 'cliente', 'Activo', 'binomio11', '1234', 'soii_fede11@hotmail.com', '2017-01-20', 'Banfield'),
(5, 'federico', 'santamaria', 'Berutti 2077', '2015-10-09', 37978272, 'cliente', 'Activo', 'binomio12', '1234', 'soii_fede12@hotmail.com', '2017-01-22', 'Banfield');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `foto1` varchar(80) NOT NULL,
  `foto2` varchar(80) NOT NULL,
  `foto3` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `nombre`, `descripcion`, `precio`, `foto1`, `foto2`, `foto3`) VALUES
(8, 'Muzzarela', 'La mas rica del  condado', 14, 'producto20170203_084308 0.jpg', 'producto20170203_084308 1.jpg', 'producto20170203_084308 2.jpg'),
(10, 'Muzzarela 1', 'La mas rica del  condado', 14, 'producto20170203_084807 0.jpg', 'producto20170203_084807 1.jpg', 'producto20170203_084807 2.jpg'),
(11, 'Empanada', 'De carne, de queso y jamon  y de verduras', 12, 'producto20170203_103914 0.jpg', 'producto20170203_103914 1.jpg', 'producto20170203_103914 2.jpg'),
(12, 'Coca cola 2lts', 'Para matar la sed', 36, 'producto20170203_104037 0.jpg', 'producto20170203_104037 1.jpg', 'producto20170203_104037 2.jpg'),
(13, 'Muzzarela 2', 'La mas rica del  condado', 14, 'producto20170205_090923 0.jpg', 'producto20170205_090923 1.jpg', 'producto20170205_090923 2.jpg'),
(14, 'MilaPizza', 'Pizza de milanesa con queso', 50, 'producto20170214_201457 0.jpg', 'producto20170214_201457 1.jpg', 'producto20170214_201457 2.jpg'),
(15, 'Pepsi', 'Botella de pepsi', 40, 'producto20170214_201932 0.jpg', 'producto20170214_201932 1.jpg', 'producto20170214_201932 2.jpg'),
(16, 'prueba', 'prueba', 14, 'producto20170216_055953 0.jpg', 'producto20170216_055953 1.jpg', 'producto20170216_055953 2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `fechaRegistro` date NOT NULL,
  `idCargo` int(11) NOT NULL,
  `idEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `mail`, `clave`, `fechaRegistro`, `idCargo`, `idEstado`) VALUES
(1, 'fedeakd', 'soii_fede@hotmail.com', '1234', '2017-01-23', 1, 1),
(14, 'cliente', 'cliente@cliente.com', 'cliente', '2017-01-25', 1, 1),
(15, 'binomio', 'soii_fede12@hotmail.com', '1234', '2017-01-26', 1, 1),
(16, 'binomio123', 'menosPlata@masHambre.com', '1234', '2017-01-27', 2, 1),
(17, 'binomio13221', 'soii_fede123123122@hotmail.com', '1234', '2017-01-27', 1, 1),
(18, 'empleadoasda', 'menosPlata123@masHambre.com', '1234', '2017-01-27', 3, 1),
(19, 'empleado22', 'menosPlata22@masHambre.com', '1234', '2017-01-27', 2, 1),
(20, 'empleado223', 'menosPlata223@masHambre.com', '1234', '2017-01-27', 2, 1),
(21, 'empleado3434', 'menosPlata343@masHambre.com', '1234', '2017-01-27', 3, 1),
(22, 'emplea1do', 'menosPlat11a@masHambre.com', '1234', '2017-01-27', 2, 1),
(23, 'empleado1233', 'menosPlata3322@masHambre.com', '1234', '2017-02-14', 2, 1),
(31, 'binomio33', 'soii_fede132@hotmail.com', '1234', '2017-02-14', 1, 1),
(32, 'empleado11', 'empleado11@empleado.com', '1234', '2017-02-14', 2, 1),
(33, 'empleado', 'empleado@empleado.com', '1234', '2017-02-14', 2, 1),
(34, 'encargado', 'encargado@encargado.com', '1234', '2017-02-14', 3, 1),
(35, 'administrador', 'administrador@administrador.com', '1234', '2017-02-14', 4, 1),
(36, 'encargodo2', 'encargodo2@encargodo2.com', 'encargodo2', '2017-02-19', 3, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`idCargo`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`idempleado`),
  ADD KEY `idLocal` (`idLocal`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`idLocal`);

--
-- Indices de la tabla `localesofertas`
--
ALTER TABLE `localesofertas`
  ADD PRIMARY KEY (`idLocalOferta`),
  ADD KEY `idOferta` (`idOferta`),
  ADD KEY `idLocal` (`idLocal`);

--
-- Indices de la tabla `localesprodu`
--
ALTER TABLE `localesprodu`
  ADD PRIMARY KEY (`idLocalProdu`),
  ADD KEY `idLocal` (`idLocal`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`idOferta`);

--
-- Indices de la tabla `ofertasproductos`
--
ALTER TABLE `ofertasproductos`
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idOferta` (`idOferta`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idLocal` (`idLocal`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `pedidosofertas`
--
ALTER TABLE `pedidosofertas`
  ADD PRIMARY KEY (`idPedidoOferta`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idOferta` (`idOferta`);

--
-- Indices de la tabla `pedidosproductos`
--
ALTER TABLE `pedidosproductos`
  ADD PRIMARY KEY (`idPedidoProducto`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idCargo` (`idCargo`),
  ADD KEY `idEstado` (`idEstado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `idCargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `idLocal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `localesofertas`
--
ALTER TABLE `localesofertas`
  MODIFY `idLocalOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `localesprodu`
--
ALTER TABLE `localesprodu`
  MODIFY `idLocalProdu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `idOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `pedidosofertas`
--
ALTER TABLE `pedidosofertas`
  MODIFY `idPedidoOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `pedidosproductos`
--
ALTER TABLE `pedidosproductos`
  MODIFY `idPedidoProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idempleado`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`idLocal`) REFERENCES `locales` (`idLocal`);

--
-- Filtros para la tabla `localesofertas`
--
ALTER TABLE `localesofertas`
  ADD CONSTRAINT `localesofertas_ibfk_1` FOREIGN KEY (`idOferta`) REFERENCES `ofertas` (`idOferta`),
  ADD CONSTRAINT `localesofertas_ibfk_2` FOREIGN KEY (`idLocal`) REFERENCES `locales` (`idLocal`);

--
-- Filtros para la tabla `localesprodu`
--
ALTER TABLE `localesprodu`
  ADD CONSTRAINT `localesprodu_ibfk_1` FOREIGN KEY (`idLocal`) REFERENCES `locales` (`idLocal`),
  ADD CONSTRAINT `localesprodu_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Filtros para la tabla `ofertasproductos`
--
ALTER TABLE `ofertasproductos`
  ADD CONSTRAINT `ofertasproductos_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  ADD CONSTRAINT `ofertasproductos_ibfk_2` FOREIGN KEY (`idOferta`) REFERENCES `ofertas` (`idOferta`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idLocal`) REFERENCES `locales` (`idLocal`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`);

--
-- Filtros para la tabla `pedidosofertas`
--
ALTER TABLE `pedidosofertas`
  ADD CONSTRAINT `pedidosofertas_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`),
  ADD CONSTRAINT `pedidosofertas_ibfk_2` FOREIGN KEY (`idOferta`) REFERENCES `ofertas` (`idOferta`);

--
-- Filtros para la tabla `pedidosproductos`
--
ALTER TABLE `pedidosproductos`
  ADD CONSTRAINT `pedidosproductos_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`),
  ADD CONSTRAINT `pedidosproductos_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idCargo`) REFERENCES `cargos` (`idCargo`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`idEstado`) REFERENCES `estados` (`idEstado`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
