# BrandLink

- Heroku
  - maria@coponstudio.es
  - MS*hero17
- Mongo Atlas
  - maria@coponstudio.es
  
  - MS*atla17
  
  - Projecto: BrandLink
  
  - User: mariasimo / vuudU8CyoHlVhOv0
  
    mongodb+srv://mariasimo:vuudU8CyoHlVhOv0@cluster0-irt38.mongodb.net/final-project?retryWrites=true&w=majority
  
  - Mail para notificaciones: brandlink.notifications@gmail.com / brandlink123
  
  
  
  

**Iniciar proyecto**

- Server: npm run dev

- Client: npm start

  

**Deploy proyecto**

- Cd client
- npm run build-prod
- cd ..
- cb
- git status, git add ., git commit -m "Message"
- git subtree push --prefix=server heroku master
- heroku logs --tail
- (a veces hay que resetear dynos desde la cuenta de heroku)





**Presentación**

- 5-6 min

- Si no necesitamos ordenador propio, enviar link

- Fecha entrega doc. jueves 16 a las 12 h.

- Crear un itinerario: 

  - 2 min introducción: landing page. Qué es un manual de marca, paint points y objetivo de la pp

  - 3 min demo: 

    - Cuenta creada con projectos
    - Creación de un nuevo usuario
    - Creación de un nuevo projecto
    - Compartir con usuario

  - Conclusión y cierre:

    - Sobre el proyecto, aprendizaje, complejidad

    - Para la gente nueva de Ironhack

      

### Prioridades

- [x] Crear landing page para vender la papeleta
  - [x] Mi presentación es la landing page
- [ ] Los projectos nos se borrar inmediatamente
- [x] Cambiar ilustraciones por las que mandé por whatsapp
- [ ] Preparar proyectos bonitos
  - [ ] User CoponStudio
- [ ] Estilos
  - [ ] Revisar estilos responsive rápidamente
  - [ ] Parallax en buble bg
  - [ ] Animación logo, Svg dibujo en bottom banner
- [ ] Forzar https
- [ ] URL de edición vs URL de lectura
  - [ ] Enviar url a usuario??? 
- [ ] Poder cargar diferentes imágenes
- [ ] Presentar las opciones de contenido de los slots de otra manera, con un select o similar
- [ ] Hacer que el editor wysiwyq se conserve en bbdd
- [ ] Descargar recursos al clicar en botón

- [ ] Implementar dragula para reordenar rows:  el modelo debe incluir un campo de orden o algo así

- [ ] Añadir color picker a new color



- [ ] Añadir campo de porcentaje de uso en colorpalette para presentar gráficos
- [ ] Upload picture / Edit profile
  - [ ] Añadir imagen al nabvar
  - [ ] Añadir loader
- [ ] Borrar slots dentro de rows. Poder contar los slots que quedan para redimensionar
- [ ] Si creo un proyecto con un nombre que ya existe, no hace nada. Mostrar mensaje de validación
- [ ] Si creo un proyecto nuevo, me redigirge al admin del proyecto anterior  
- [ ] Si estás logueado, el inicio es el panel de usuario (al clicar en el logo)

- [ ] Añadir mensajes cuando hay errores de login y signup
  - [ ] No devuelve los mensajes de validación de signup: password lenght y username taken
- [ ] Hacer que se pueda editar nombre y contraseña del usuario
- [ ] Añadir elemento botón o que se deduzca de los estilos de marca
- [ ] Login social
- [ ] Recordar como integrar signup con Nodemailer

- [ ] Solo funciona con https
- [ ] Hacer deploy a Heroku





## Models

Escribir aquí modelos actuales y lo que necesito

- [ ] Images: assets

  - [ ] Sort

  - [ ] Search (need name)

  - [ ] Add icon when is another format from image

  - [ ] File thumbnails https://cloudinary.com/blog/uploading_converting_and_generating_thumbnails_for_pdf_documents

  - [ ] Add loader

  - [ ] Add a name. Toma por defecto el nombre del archivo pero se puede editar

    https://www.npmjs.com/package/react-editext

  - [ ] Paginar



**Notas**

- Cerrar diciendo que sigue siendo un wip, y de que los usuarios normalmente no percibimos la complejidad que hay detras de un projecto web cerrado y complejo
- Ahora mismo tengo todos los elementos dependiendo del user activo. con lo cual, en el enlace de lectura, cuando no hay user se rompe. Puedo hacer una llamada a la base de datos desde mainContent con el id y recuperar todo y guardarlo en el state???