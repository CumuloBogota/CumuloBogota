# Cómo Contribuir

Si estás leyendo esto, probablemente hagas parte de Cúmulo VIP y tengas la tarea de mantener este sitio web, o tal vez simplemente quieras aportar a su desarrollo o incluso hacer correcciones. Dependiendo de qué tan profundas sean las modificaciones necesitarás saber más o menos cosas, pero aquí encontrarás todo lo necesario.

## Índice

- [Edición básica](#edición-básica)
- [Edición avanzada](#edición-avanzada)
    - [Entendiendo Jekyll](#entendiendo-jekyll)
- [Committing changes](#committing-changes)


---

## Edición básica

Consiste en

- Corregir errores de ortografía
- Mejorar la redacción
- Agregar nuevo contenido (texto o imágenes)

Puedes editar el contenido directamente desde GitHub o desde tu dispositivo, para ello necesitarás una cuenta y permisos de escritura, para obtenerlos puedes contactar al administrador del sitio.

### Editando desde GitHub

Sigue estos pasos

1. Navega hasta el archivo que desees editar
2. Haz clic en *Edit* (✏️) y realiza tus cambios
3. Revisa tus cambios en *Preview* 
4. Una vez estés conforme, debes guardar los cambios en un *Commit*, para ello haz clic en *Commit Changes...*, escribe un mensaje siguiendo la estructura explicada en [esta guía](#committing-changes) y listo!


---

## Edición avanzada

Consiste en

- Modificar la estructura de la página (HTML)
- Cambiar los estilos de algún elemento (CSS) (colores, fuentes, tamaños, dimensiones, disposición en el espacio, etc.)
- Añadir nuevas funcionalidades (scripts de JavaScript)

Seguramente querrás ver como afectan tus cambios al resultado final, por lo que se recomienda que instales herramientas como un editor de texto plano (Visual Studio Code, Sublime Text, Neovim), Git, Ruby y jekyll, esto varía dependiendo de la plataforma:

**Windows** 
- Windows Package Manager CLI: `winget install RubyInstallerTeam.Ruby.{MAJOR}.{MINOR}` (`MAJOR` y `MINOR` corresponden a la versión, e.g. 3.2) 
- Chocolatey Package Manager: `choco install ruby` 
- [Ruby Installer](https://rubyinstaller.org/), [Git](https://git-scm.com/install/)

**Linux** 

- Arch Linux: `sudo pacman -S code git ruby` 
- Debian: `sudo apt-get install git ruby-full` 
- Mint: `` 
- Ubuntu: `sudo apt-get install git ruby-full` 

**Android** 
```bash
pkg install neovim git ruby
```

Asegurate de tener a Git y Ruby en tu PATH, luego desde una terminal (CMD, Alacritty, GNOME terminal, Kitty, Termux, etc.) ejecuta en la ubicación deseada el comando
```bash
git clone https://github.com/Cumulo-Bogota/Cumulo-Web-Bogota.git
```
para clonar los archivos de la página web en tu máquina, luego entra al directorio creado con 
```bash
cd Cumulo-Web-Bogota
```
también será necesario correr
```bash
gem install bundler jekyll
```
una vez terminado corre el siguiente comando en el directorio del proyecto
```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml --port 4000 --livereload
```
y en cualquier navegador accede a la dirección `127.0.0.1:4000` 

Cada vez que guardes cambios localmente la página se actualizará de manera automática, una vez termines de realizar los cambios súbelos a GitHub.


### Entendiendo Jekyll

Piensa en Jekyll como un compositor de la página, toma los datos de distintos sitios (los directorios y archivos que comienzan por _) y los une para generar un HTML que el navegador pueda entender, te preguntarás entonces ¿por qué no solo hacer el HTML de manera normal y ya? Y la respuesta es porque eso es un diseño demasiado rígido, difícil de leer y propenso a errores al ser editado, además si hay componentes que se comparten entre diferentes páginas y se quiere realizar un cambio, ¡todos los archivos tendrían que ser editados! Jekyll permite un diseño modular donde cada componente se define una vez y se puede utilizar como plantilla dentro de las páginas a conveniencia. Para lograr esto, Jekyll utiliza los directorios `_layouts`, `_includes` y `_data`, vamos a ver cada uno en detalle:

Estructura del proyecto:

```bash
Gemfile
_config.yml
_config_dev.yml
_data
└── telescopios.yml
_includes
└── header.html
_layouts
└── default.html
_site
images
└── logo.png
index.html
pages
├── actividades.html
└── ...
scripts
└── script.js
styles
├── pages
└── style.css
```

#### `_layouts` 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }}</title>
</head>
<body>
  {{ content }}
</body>
</html>
```

Corresponden a la "plantilla principal", la estructura del documento HTML que se va a generar, es importante principalmente por el `<head>`, donde se va a declarar el título de la página, el uso de estilos `.css`, fuentes, iconos y el favicon (la imagen que acompaña al nombre de la pestaña). ¿Notas algo extraño? `{{ page.title }}` y `{{ content }}` no forman parte de la sintaxis típica de HTML, son formas de decirle a Jekyll que algo va a ser insertado allí, ¿pero qué? Eso depende, el contenido que se vaya a insertar puede venir de diferentes sitios como el *front matter* o nuestra `página.html`, pero se hablará de esto en las secciones pertinentes.

#### `_includes` 

```html
<div class="header">
  <p>Hello there!</p>
  <p>{{ include.general_kenobi }}</p>
  <img src="{{ '/images/grievous.jpg' | relative_url }}" alt="General Grievous">
</div>
```

Son fragmentos de código HTML con una funcionalidad parecida a los `_layouts`, pero son plantillas más pequeñas para elementos estándar del diseño de la página, pueden o no tener elementos mutables que se distinguen por los `{{ include.variable_name }}`. Los valores de las variables se pueden establecer al llamar a `include`, del *front matter* o de `_data`, pero para nuestro caso **siempre** provendrán de `_data`.

#### `_data` 

```yml
title: Título
description: Lorem ipsum dolor...
image: /images/imagen.jpg
```

Donde se almacenarán el texto y enlaces a imágenes que se mostrarán en determinada página; en cada archivo cuyo nombre **deberá corresponder con el de la página que usará los valores** se guardan pares del tipo `nombre_de_variable: contenido`. También permite estructuras más complejas para separar los datos de cada include que se llame en la página pero eso deberá documentarse.


---

## Committing changes

Algunas convenciones a tener en cuenta

- `config` para cambios en la configuración del sitio
- `docs` para cambios en la documentación
- `feat` para nuevas funcionalidades
- `fix` para arreglos
- `looks` para cambios en el CSS o el diseño gráfico en general
- `new` para nuevos archivos agregados
- `refactor` para re-estructuraciones del código
- `style` para ajustes estilísticos del código (indentaciones, espacios)

intenta mantener los mensajes de los commits cortos y descriptivos.
