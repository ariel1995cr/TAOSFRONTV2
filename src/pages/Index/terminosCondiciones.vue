<template>
  <div class="p-d-flex p-flex-column p-flex-md-row p-jc-center p-ai-center" style="height: 85vh">
    <div class="p-px-2">
      <img src="/images/logo-taos-pequeño.png" />
    </div>
    <div class="border-login-right p-px-2">
      <h1>POLÍTICA DE PRIVACIDAD</h1>
      <ScrollPanel style="width: 100%; height: 400px">
        <p class="p-text-justify" style="max-width: 125ch; overflow-y: auto">
          El presente Política de Privacidad establece los términos en que Tecno-Soluciones usa y protege la información que es proporcionada por sus usuarios al momento de utilizar sus herramientas. Nuestra compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
          Información que es recogida
          Nuestro sitio web podrá recoger información personal por ejemplo: Nombre,  información de contacto como  su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.
          Uso de la información recogida
          Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios.  Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.
          Estamos altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.
          Cookies
          Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.
          Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente noticias. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
          Enlaces a Terceros
          Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.
          Control de su información personal
          En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web.  Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico.  En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.
          Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.
          Tecno-Soluciones Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.
        </p>
      </ScrollPanel>
    </div>
  </div>
  <div class="p-grid">
    <div class="p-px-6 p-col-12">
      <img class="p-col-12 p-md-2"  src="/images/logo-taos.png" />
      <hr>
      <div class="p-grid" >
        <div @click="router.push('/')" class="p-col-12 p-md-4" style="vertical-align: center !important;">
          <img width="25px" height="25px" src="/images/logoTecnoMini.jpg" />
          <span>POWERED BY TECNOSOLUCIONES</span>
        </div>
        <div class="p-col-12 p-md-4 p-mt-2 p-md-offset-4" style="vertical-align: center !important;">
          <p>
            <span @click="router.push('/')">INICIO</span>| ACERCA DE NOSOTROS | <span @click="router.push({name:'politica-de-privacidad'})">POLITICA</span> | CONTACTOS | <span>TERMINOS Y CONDICIONES</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useToast } from "primevue/usetoast";
import router from "../../router/index";
import ScrollPanel from 'primevue/scrollpanel';

export default defineComponent({
  components:{
    ScrollPanel
  },
  setup() {
    const toast = useToast();
    let loading = ref(false);
    return {
      router
    };
  },
});
</script>
<style lang="scss">

.vcenter-item{
  display: flex;
  align-items: center;
}

body{
  overflow-x: hidden;
  background: linear-gradient(#718FC8, white 60%) no-repeat fixed;
}

h1, h2, h3, h4, h5, h6{
  margin: 0 !important;
}

.border-login-left{
  border-right: 2px solid #6c757d;
}
.border-login-right{
  border-left: 2px solid #6c757d;
  @media (max-width: 768px) {
    border-left: 0px;
    margin-top: 2px;
  }
}

</style>
