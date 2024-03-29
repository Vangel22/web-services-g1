### Validation

    - Mongoose schema validation:
        1. Едноставна валидација во дефиницијата на шемата
        2. Интеграција со MongoDB, се осигурува дека податоците се валидираат пред да се вметнат во базата на податоци.
        3. Перформанс - ефикасен е да се користи за едноставни валидации
        4. Флексибилност - со помош на pre и post hooks можеме да правиме комплексни валидации

        - Ефективна валидација на серверска страна
        - Валидација на одредено поле во шемата

    - Node-input-validator:
        1. Cross-Field валидација - пр. endDate е после startDate
        2. Валидација на клиентска страна - може да валидираме што ни испраќа корисникот/клиентот како барање
        3. Вградени валидации за email, password и слично
        4. Интеграција со Express.js во middleware

### Environment

    - Во апликациите потребно е да имаме повеќе од една околина, како што се околина за развој на софтвер (dev, develop, development), околина каде што корисниците ја користат апликацијата во реалниот свет (продукција, master, main) и стејџинг (претпродукција, staging) околина која служи за тестирање пред да направиме верзија од истата на продукција. Еве неколку причини зошто околините се важни:

    1. Развој и Тестирање: Развојната околина е место каде што програмерите можат да работат на нови функционалности и да тестираат код без да влијае врз продукциската апликација. Стејџинг околината, исто така, овозможува тестирање на апликацијата во услови што се што е можно поблиски до продукцијата, за да се осигура дека се работи како што треба пред да се објави во продукциската средина.

    2. Изолација на Податоци: Секоја околина има своја база на податоци и ресурси. Ова помага во спречување на случајни промени и конфликти меѓу тестирачките и продукциските податоци.

    3. Издвоени Проблеми: Доколку се појави проблем во продукциска околина, таа ќе биде испитана и оценета од одделен тим, наместо да се влијае на развојната околина. Ова овозможува одделени тимови за развој и поддршка.

    4. Сигурност и Поверливост: продукциска околина може да биде поставена да има построги сигурносни мерки, заштита на приватноста и стабилност, додека развојната околина може да биде посветена на брзо развој и експериментирање.

    5. Скалабилност: Одделувањето на околините овозможува поедноставување на процесот на скалирање на апликацијата. На пример, може да има повеќе сервери во продукциска околина одколку во развојната, за да се поддржи голем број на корисници и трансакции.

    Овие околини играат клучна улога во развојот, тестирањето и одржувањето на апликациите, и помагаат во осигурување на квалитет и стабилност на производот.
