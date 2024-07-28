const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const memoryUsage = process.memoryUsage();
const contUso=0;

// const flowStats= addKeyword('!estadisticas')

const flowPrueba = addKeyword('!bot').addAnswer('🤖Bot activo')
const flowSaludo = addKeyword(['az','hola'])
.addAnswer('🏍 *JGR Custom* \n¡Hola! Podes acceder al *Menú* de servicios.'
    // ,null, async(ctx,{gotoFlow})=>
    // {
    //         await gotoFlow(flowMenu);
    // }
);

const flowMenu= addKeyword(['menú','menu'])
.addAnswer(
    [ 
        // 
        '🏍 *SERVICIOS:* 🏍',
        '🔧 *1*. Service de mantenimiento.',
        '🔧 *2*. Reparaciones mecánicas.',
        '🔧 *3*. Reparaciones eléctricas.',
        '🔧 *4*. Restauraciones.',
        '🔧 *5*. Modificaciones.',
        '🗒 *6*. Turnos.',
        '📍 *7*. Ubicación del Taller.',
        '🕓 *8*. Horarios de atención.',
        '🌐 *9*. Redes Sociales.',
        '❓ *10* Otro...',
        '*Por favor, elige el número de la opción que te interesa.*',
        // '\nTambien puede acceder al *Catálogo* y *Turnos*',
    ],
    { capture: true },
     async (ctx, {gotoFlow, fallBack})=>{
        switch(ctx.body){
            case "1":
                return gotoFlow(flow1);
            case "2":
                return gotoFlow(flow2);
            case "3":
                return gotoFlow(flow2);
            case "4":
                return gotoFlow(flow1);
            case "5":
                return gotoFlow(flow1);
            case "6":
                return gotoFlow(FlowTurnos);
            case "7":
                return gotoFlow(flowUbicacion);
            case "8":
                return gotoFlow(flowHorario);
            case "9":
                return gotoFlow(flowRedesSociales);
            case "10":
                return gotoFlow(flowOtro);
            }
        }
    );
    // []
// -----------------SERVICE, RESTAURACION Y MODIFICACION
const flow1 = addKeyword(EVENTS.ACTION)
    .addAnswer(
        '🏍 Porfavor ingrese *Modelo* y *Cilindrada* de la moto. \n*En un solo mensaje.*', 
        {capture:true},async (ctx, { flowDynamic }) =>
            {
                await flowDynamic([
                    '🏍 En breve recibirá una respuesta.',
                ])
            }        
    );
// // -------------REPARACIONES
    const flow2 = addKeyword(EVENTS.ACTION)
    .addAnswer(
        '🏍 Porfavor ingrese el problema que presenta la moto, *modelo* y *cilindrada.* \n*En un solo mensaje.*', 
        {capture:true},async (ctx, { flowDynamic }) =>
            {
                await flowDynamic([
                    '🏍 En breve recibirá una respuesta.',
                ])
            }        
    );
// -----------------TURNOS
const FlowTurnos = addKeyword(EVENTS.ACTION)
.addAnswer('🗒 Porfavor ingrese: \nServicio, Modelo y cilindrada de la moto.\nEn *un solo mensaje*.',
    {capture:true},async (ctx, { flowDynamic }) =>
        {
            await flowDynamic([
                '🏍 En breve recibirá una respuesta.',
            ])
        }
    );
// --------------'📍 *7*. Ubicación del Taller.',
const flowUbicacion = addKeyword(EVENTS.ACTION)
    .addAnswer(
            '📍 El taller esta ubicado en:\nRuta A009 kilómetro 8\n https://maps.app.goo.gl/napmSLQc1ashwfxq9',
            null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
// -----------------'🌐 *9*. Redes Sociales.',
const flowRedesSociales = addKeyword(EVENTS.ACTION)
    .addAnswer(
            '🏍 *Instagram*\n https://www.instagram.com/jgr.motos/ \n 🏍 Facebook\nhttps://www.facebook.com/jgrmotos',
            null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
    // ------------otro
const flowOtro = addKeyword(EVENTS.ACTION)
    .addAnswer(
            '🏍 *Igrese su consulta...*',
            {capture:true},async (ctx, { flowDynamic }) =>
                {
                    await flowDynamic([
                        '🏍 En breve recibirá una respuesta.',
                    ])
                }
            );
const flowHorario = addKeyword(EVENTS.ACTION)
    .addAnswer(
        '🕓 *Horarios de atencion.*\n Lunes a Sabados \nDe 9hs-12hs y 16hs-20hs',
            null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    ); 

const flowLoop= addKeyword(EVENTS.ACTION).addAnswer('🏍 En cualquier momento puede acceder al *Menú*.'  ,
);

const flowGracias = addKeyword(['gracias']).addAnswer('🏍¡Gracias a vos!')


    // confiuracion:
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrueba,flowSaludo, FlowTurnos, flowMenu, flow1, flow2, FlowTurnos, flowUbicacion, flowRedesSociales, flowOtro, flowHorario, flowLoop ,flowGracias])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },{
        blackList:[
            '5493482758596', 
            '5493482704300',
            '5493482290948',
            '5493482202822',
            '5493482667423',
            '5493517651875', 
            '346549278306',  
            '5493482276774',
            '5493482671141',
            '5493482272719',
            '5493482227143',
            '5493482290961',
            '5493482224574',
            '5491169386940'  
        ]
    })

    QRPortalWeb({name:JuanMecanico, port:3001})
}

main()
