
//ventas locales- productos
SELECT l.nombre, COUNT(pp.idProducto) FROM pedidosproductos  as pp
INNER JOIN pedidos as p ON pp.idPedido=p.idPedido
INNER JOIN locales as l ON p.idLocal= l.idLocal
GROUP BY p.idLocal
//ventas locales- ofertas

SELECT l.nombre, COUNT(po.idOferta) FROM pedidosofertas  as po
INNER JOIN pedidos as p ON po.idPedido=p.idPedido
INNER JOIN locales as l ON p.idLocal= l.idLocal
GROUP BY p.idLocal


//productos - ventas

SELECT po.nombre, COUNT(pp.idProducto) FROM pedidosproductos as pp
INNER JOIN pedidos as pe ON  pp.idPedido= pe.idPedido
INNER JOIN productos as po ON pp.idProducto=  po.idProducto
GROUP BY pp.idProducto


//ofertas - ventas
SELECT o.nombre, COUNT(o.idOferta) FROM pedidosofertas as po
INNER JOIN pedidos as pe ON  po.idPedido= pe.idPedido
INNER JOIN ofertas as o ON po.idOferta=  o.idOferta
GROUP BY o.idOferta

//cliente productos


SELECT c.nombre, COUNT( pp.idPedido) FROM pedidos as pe
INNER JOIN clientes as c ON  pe.idCliente= c.idCliente 
INNER JOIN pedidosproductos as pp ON pp.idPedido= pe.idPedido
GROUP BY pp.idPedido, pe.idCliente



//traer  los pedidos por usuarios

SELECT  c.nombre, l.nombre, p.precio , p.fecha FROM  pedidos AS p
INNER JOIN locales AS  l  ON l.idLocal= p.idLocal  
INNER JOIN clientes AS c  ON c.idCliente=p.idCliente
WHERE p.idCliente=33;


//Traer todos los emppleados 

SELECT  u.fechaRegistro, c.nombre  as cargo , e.nombre, e.apellido, e.sueldo  FROM usuarios as u
INNER JOIN  empleados as e ON u.idUsuario= e.idEmpleado
INNER JOIN  cargos  as c ON u.idCargo= c.idCargo 
WHERE u.idEstado=1;

//Comprobar  encargado - local

SELECT COUNT(*) AS 'cantidad' FROM locales as l
INNER JOIN empleados as e ON e.idLocal= l.idLocal
INNER JOIN usuarios as u ON u.idUsuario=e.idEmpleado
WHERE u.idCargo=3 and  l.idLocal=15