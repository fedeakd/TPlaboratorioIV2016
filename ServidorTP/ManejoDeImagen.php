<?php 
class ManejoDeImagen{


	public static function SubirImagenTemporal(){
		if ( !empty( $_FILES ) ) 
		{	
			$temporal = $_FILES[ 'file' ][ 'tmp_name' ];
			$ruta=ManejoDeImagen::RutaTemporal($_FILES[ 'file' ][ 'name' ]);
			//$ruta ="..".DIRECTORY_SEPARATOR."..". DIRECTORY_SEPARATOR. 'fotosTemporal' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
			move_uploaded_file( $temporal, $ruta );
			echo "correcto";
		}

	}
	public static function DarRutaImagenDefinitiva($dato){
		return ManejoDeImagen::Ruta().'fotos' . DIRECTORY_SEPARATOR .$dato;


	}
	public static function RutaTemporal($dato){
		return ManejoDeImagen::Ruta().'fotosTemporal' . DIRECTORY_SEPARATOR .$dato;
	}

	private static function Ruta(){
		return  "..".DIRECTORY_SEPARATOR."..". DIRECTORY_SEPARATOR ;
	}
	public static function BorrarImagenTemporal(){
		echo ManejoDeImagen::RutaTemporal("");
		$files = glob(ManejoDeImagen::RutaTemporal(""));
		foreach($files as $file){ 
			if(is_file($file))
				unlink($file); 
		}
	}
	public static function CargarImagenes($array,$entidad){
		$fechaActual=$entidad.date("Ymd_His");
		$imagenes=[];
		$num=0;
		foreach ($array as $ruta) {
			$nombre=$fechaActual." ".$num.".jpg";
			$fotosTemporal=  ManejoDeImagen::RutaTemporal($ruta);
			$fotosReal=   ManejoDeImagen::DarRutaImagenDefinitiva( $nombre);

			array_push($imagenes,$nombre);

			copy( $fotosTemporal, $fotosReal );
			unlink($fotosTemporal);

			$num++;
		}
		return $imagenes;
	}

}


?>