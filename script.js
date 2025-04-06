// Toggle da Sidebar
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    });
}

// Mapa Leaflet
const leafletMap = L.map('leafletMap').setView([-14.2350, -51.9253], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
}).addTo(leafletMap);

L.control.zoom({ position: 'topright' }).addTo(leafletMap);

// Ícone personalizado
const customIcon = L.divIcon({
    className: 'custom-circle-icon',
    html: '<div class="circle-pin"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

// Lista de locais com informações
const locations = [
    { name: "Alto Paraná", lat: -22.1245, lng: -52.0192, popup: `
        <div class="popup-box">
            <strong>Alto Paraná</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Cel. João B Lopes, 252 - Jardim Guanabara, Paranavaí - PR, 87706-370<br>Tel: (44) 3421-1700</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Estados Unidos - Alto Paraná, PR, 87750-000<br>Tel: (44) 3447-1202</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. John Kenedy, 1-135 - Jardim Iguaçu, Paranavaí - PR, 87705-370<br>Tel: (44) 3423-1269</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. Felipe Camarão, 645 - Centro, Nova Esperança - PR, 87600-000<br>Tel: (44) 3112-4350</div>
        </div>` },
    { name: "Bacuri", lat: -19.6733, lng: -51.1902, popup: "<div class='popup-box'><strong>Bacuri</strong><br><br>Informações em atualização.</div>" },
    { name: "Barro Branco", lat: -19.6745, lng: -51.1855, popup: "<div class='popup-box'><strong>Barro Branco</strong><br><br>Informações em atualização.</div>" },
    { name: "Caatinga 01", lat: -4.1786, lng: -38.1302, popup: "<div class='popup-box'><strong>Caatinga 01</strong><br><br>Informações em atualização.</div>" },
    { name: "Caatinga 02", lat: -4.1341, lng: -38.3972, popup: "<div class='popup-box'><strong>Caatinga 02</strong><br><br>Informações em atualização.</div>" },
    { name: "Caatinga 15", lat: -4.8373, lng: -37.7815, popup: "<div class='popup-box'><strong>Caatinga 15</strong><br><br>Informações em atualização.</div>" },
    { name: "Caatinga 23", lat: -4.1804, lng: -38.1272, popup: "<div class='popup-box'><strong>Caatinga 23</strong><br><br>Informações em atualização.</div>" },
    { name: "Cassilândia", lat: -19.1178, lng: -51.7315, popup: `
        <div class="popup-box">
            <strong>Cassilândia</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Vicente de Andrade Vasconcelos, 179, Cassilândia - MS, 79540-000</div>
            <div class="orgao"><strong>Delegacia:</strong><br>BR-158, 0 - Centro, Cassilândia - MS, 79540-000<br>Tel: (67) 3596-1366</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Benedito da Palma Oliveira, 285 - Vila Santo Antonio, Paranaíba - MS, 79500-000<br>Tel: (67) 3503-1094 ou (67) 3503-1071</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Rua Pedro Pereira de Almeida, 391 - Centro, Cassilândia - MS, 79540-000<br>Tel: (67) 3596-1133</div>
        </div>` },
    { name: "Cidade Gaucha", lat: -23.3775, lng: -52.9437, popup: `
        <div class="popup-box">
            <strong>Cidade Gaúcha</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Juscelino Kubitscheck, 927-1041, Cidade Gaúcha - PR, 87820-000<br>Tel: (44) 3675-1578</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Rio Grandense, 57, Cidade Gaúcha - PR, 87820-000<br>Tel: (44) 3675-1202</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. Allan Kardec, 700 - Zona de Armazém, Cianorte - PR, 87207-012<br>Tel: (44) 3351-3350</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>R. Firmínio Viêira de Oliveira, 1947 - Centro, Cidade Gaúcha - PR, 87820-000<br>Tel: (44) 3675-1557</div>
        </div>` },
    { name: "Euclides da Cunha", lat: -22.4127, lng: -51.8569, popup: `
        <div class="popup-box">
            <strong>Euclides da Cunha Paulista</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Gilberto Luís da Rocha, Euclides da Cunha Paulista - SP, 19275-000<br>Tel: (18) 3283-1265</div>
            <div class="orgao"><strong>Delegacia:</strong><br>Rua Adriane Cristina V Silva, 503, Euclides da Cunha Paulista - SP, 19275-000<br>Tel: (18) 3283-1255</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Antônio Silva, 1757, Euclides da Cunha Paulista - SP, 19275-000<br>Tel: (18) 3283-2321</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. dos Barrageiros, S/N - Primavera, Rosana - SP, 19274-000<br>Tel: (18) 3284-9500</div>
        </div>` },
    { name: "Iguaraçu", lat: -23.1997, lng: -51.8256, popup: `
        <div class="popup-box">
            <strong>Iguaraçu</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Rua João Brunetti, 314, Iguaraçu - PR, 86750-000</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. João Brunete, 314 - Jardim União Um, Iguaraçu - PR, 86750-000<br>Tel: (44) 3248-1235</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. Brasil, 254 - Jardim União Um, Iguaraçu - PR, 86750-000<br>Tel: (44) 99919-2788</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>R. Santos Dumont, 555 - Zona 03, Maringá - PR, 87050-100<br>Tel: (44) 3027-5151</div>
        </div>` },
    { name: "Loanda", lat: -22.9292, lng: -53.146, popup: `
        <div class="popup-box">
            <strong>Loanda</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>PR-182, km 69, Loanda - PR, 87900-000<br>Tel: (44) 3425-2305</div>
            <div class="orgao"><strong>Delegacia:</strong><br>Av. Curitiba, 547 - Centro, Loanda - PR, 87900-000<br>Tel: (44) 3425-1564</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Tocantins, 150, Loanda - PR, 87900-000<br>Tel: (44) 3425-5143</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>R. Cristóvão Colombo, 67, Loanda - PR, 87900-000<br>Tel: (44) 3425-8407</div>
        </div>` },
    { name: "Munhoz de Melo", lat: -23.1479, lng: -51.7713, popup: `
        <div class="popup-box">
            <strong>Munhoz de Melo</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Rua Interventor Manoel Ribas, 617 - Centro, Munhoz de Melo - PR, 86760-000<br>Tel: (44) 3258-1121</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Des. Antônio Franco - Munhoz de Melo, PR, 86760-000<br>Tel: (44) 3258-1121</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. Brasil, 254 - Jardim União Um, Iguaraçu - PR, 86750-000<br>Tel: (44) 99919-2788</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>R. Domingos Ricardo de Lima, 531 - Centro, Munhoz de Melo - PR, 86760-000<br>Tel: (44) 99926-4413</div>
        </div>` },
    { name: "Nova Esperança", lat: -23.1847, lng: -52.2032, popup: `
        <div class="popup-box">
            <strong>Nova Esperança</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Rua Barão de Antonina, 84 - Parque das Grevilhas, Nova Esperança - PR<br>Tel: (44) 3252-4172 / (44) 3252-5172 / (44) 3252-5009</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Visc. de Guarapuava, 305 - Nova Esperança, PR, 87600-000<br>Tel: (44) 3252-4233</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. São José, 256 - Centro, Nova Esperança - PR, 87600-000<br>Tel: (44) 3252-8331</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. Felipe Camarão, 645 - Centro, Nova Esperança - PR, 87600-000<br>Tel: (44) 3112-4350</div>
        </div>` },
    { name: "Paraíso das Águas", lat: -19.0219, lng: -53.0112, popup: `
        <div class="popup-box">
            <strong>Paraíso das Águas</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Epaminondas Nogueira de Camargo, 34 - Centro, Paraíso das Águas - MS, 79550-000<br>Tel: (67) 3248-1141</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Dejanira R dos Santos, 596 - Centro, Paraíso das Águas - MS, 79550-000<br>Tel: (67) 3248-1393</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Rua Ambrosina Paes Coelho, 717 - Centro, Costa Rica - MS, 79550-000<br>Tel: (67) 3247-1133</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. José Ferreira da Costa, 2222 - Vila Santana, Costa Rica - MS, 79550-000<br>Tel: (67) 3247-6600</div>
        </div>` },
    { name: "Paranaíba", lat: -19.6762, lng: -51.1909, popup: `
        <div class="popup-box">
            <strong>Paranaíba</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. José Rodrigues Ferraz, 945 - Jardim Santana, Paranaíba - MS, 79500-000<br>Tel: (67) 3503-1393</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. José Rodrigues Ferraz, 945 - Jardim Santana, Paranaíba - MS, 79500-000<br>Tel: (67) 3503-1393</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Benedito da Palma Oliveira, 285 - Vila Santo Antonio, Paranaíba - MS, 79500-000<br>Tel: (67) 3503-1071</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. Durval Rodrigues Lopes, 400 - Ipê Branco, Paranaíba - MS, 79500-000<br>Tel: (67) 3558-0160</div>
        </div>` },
    { name: "Pequi 1", lat: -16.8312, lng: -49.5366, popup: "<div class='popup-box'><strong>Pequi 1</strong><br><br>Informações em atualização.</div>" },
    { name: "Pequi 2", lat: -16.9711, lng: -49.7733, popup: "<div class='popup-box'><strong>Pequi 2</strong><br><br>Informações em atualização.</div>" },
    { name: "Pinheiros 03", lat: -22.0005, lng: -49.4353, popup: "<div class='popup-box'><strong>Pinheiros 03</strong><br><br>Informações em atualização.</div>" },
    { name: "Pinheiros 07", lat: -21.0018, lng: -50.6452, popup: "<div class='popup-box'><strong>Pinheiros 07</strong><br><br>Informações em atualização.</div>" },
    { name: "Pipa 01 e 02", lat: -5.3005, lng: -37.5197, popup: "<div class='popup-box'><strong>Pipa 01 e 02</strong><br><br>Informações em atualização.</div>" },
    { name: "Pres. Venceslau", lat: -21.8757, lng: -51.8449, popup: `
        <div class="popup-box">
            <strong>Presidente Venceslau</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Av. João Pessoa, 710 - Jardim Europa, Pres. Venceslau - SP, 19400-000<br>Tel: (18) 3271-5740</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Alm. Barroso, 341 - Centro, Pres. Venceslau - SP, 19400-000<br>Tel: (18) 3271-2060</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. Princesa Isabel, 695 - Centro, Pres. Venceslau - SP, 19400-000<br>Tel: (18) 3271-5957</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>R. Antônio Vila Nova, 66 - Centro, Pres. Venceslau - SP, 19400-059<br>Tel: (18) 3271-1124</div>
        </div>` },
    { name: "Rolim de Moura 1 e 2", lat: -11.7278, lng: -61.7771, popup: `
        <div class="popup-box">
            <strong>Rolim de Moura</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Corumbiara, 4707 - Centro, Rolim de Moura - RO, 78987-000<br>Tel: (69) 3442-1319</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Jamari, 5416 - São Cristovao, Rolim de Moura - RO, 78987-000<br>Tel: (69) 3442-1411</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. Goiânia, 5440 - Centro, Rolim de Moura - RO, 76940-000<br>Tel: (69) 3442-3193</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. Cuiabá, 5414 - Planalto, Rolim de Moura - RO, 76940-000<br>Tel: (69) 3442-1711</div>
        </div>` },
    { name: "São Jeronimo 1", lat: -29.9644, lng: -51.731, popup: `
        <div class="popup-box">
            <strong>São Jerônimo</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Rua São Jerônimo, 247 - Centro, São Jerônimo - RS, 96700-000<br>Tel: (51) 3651-1212</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Nicácio Machado, 51 - Centro, São Jerônimo - RS, 96700-000<br>Tel: (51) 3651-9054</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Av. Ramiro Barcelos, 1096 - Centro, São Jerônimo - RS, 96700-000<br>Tel: (51) 3651-2055</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. Rio Branco, 1008 - Bela Vista, São Jerônimo - RS, 96700-000<br>Tel: (51) 3651-8500</div>
        </div>` },
    { name: "Serra do Mar 03", lat: -22.7304, lng: -45.1198, popup: "<div class='popup-box'><strong>Serra do Mar 03</strong><br><br>Informações em atualização.</div>" },
    { name: "Serra do Mar 04", lat: -22.5763, lng: -44.963, popup: "<div class='popup-box'><strong>Serra do Mar 04</strong><br><br>Informações em atualização.</div>" },
    { name: "Serra do Mar 06", lat: -23.1016, lng: -45.7064, popup: "<div class='popup-box'><strong>Serra do Mar 06</strong><br><br>Informações em atualização.</div>" },
    { name: "Serra do Mar 07 e 26", lat: -22.7304, lng: -45.1198, popup: "<div class='popup-box'><strong>Serra do Mar 07 e 26</strong><br><br>Informações em atualização.</div>" },
    { name: "Taquarituba 1 e 2", lat: -23.5332, lng: -49.2441, popup: `
        <div class="popup-box">
            <strong>Taquarituba</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Cel. Macedo, 190 - Jardim Dona Amelia, Taquarituba - SP, 18740-000</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Mal. Floriano Peixoto, 938 - Centro, Taquarituba - SP, 18740-000<br>Tel: (14) 3762-1222</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Mal. Floriano Peixoto, 95 - Centro, Taquarituba - SP, 18740-000<br>Tel: (14) 3762-1700</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Rua José Gomes Loureiro, 1135 - Centro, Taquarituba - SP, 18740-000<br>Tel: (14) 3762-1318</div>
        </div>` },
    { name: "Guapó", lat: -16.6728, lng: -49.4879, popup: `
        <div class="popup-box">
            <strong>Guapó</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Rodolfo Taváres - Centro, Guapó - GO, 75350-000<br>Tel: (62) 3552-1190</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Santa Helena, 954 - Vila João Rasse, Guapó - GO, 75350-000<br>Tel: (62) 3552-1128</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. da Pecuária, 90 - Santuário, Trindade - GO, 75380-000<br>Tel: (62) 3505-3369</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Rua P-2, Quadra 11, Lote 01 - Setor Primavera, Guapó - GO, 75350-000<br>Tel: (62) 3552-1122 ou (62) 3552-1280</div>
        </div>` },
    { name: "Cezarina", lat: -16.8308, lng: -49.9258, popup: `
        <div class="popup-box">
            <strong>Cezarina</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Rui Barbosa, Cezarina - GO, 76195-000<br>Tel: (64) 3543-1190</div>
            <div class="orgao"><strong>Delegacia:</strong><br>Rua 03, Quadra 03, Lote 01 - Setor Cristina, Trindade - GO, 75380-000<br>Tel: (62) 3505-6110 / (62) 3505-6651 / (62) 3505-5573</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Avenida Manoel Monteiro, esquina com Rua da Pecuária - Jardim Salvador, Trindade - GO, 75388-478<br>Tel: (62) 3505-1153 ou (62) 3505-3369</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Avenida Luís Cardoso de Almeida, Quadra 10, Lotes 1-5, s/n - Centro, Cezarina - GO, 76195-000<br>Tel: (64) 3543-6012</div>
        </div>` },
    { name: "Presidente Alves", lat: -21.6768, lng: -49.7478, popup: `
        <div class="popup-box">
            <strong>Presidente Alves</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Rua Barão do Rio Branco, 420 - Centro, Garça - SP, 17400-000<br>Tel: (14) 3471-1230 ou (14) 3471-1231</div>
            <div class="orgao"><strong>Delegacia:</strong><br>Rua Carlos Ferrari, 260 - Centro, Garça - SP, 17400-000<br>Tel: (14) 3471-1210 ou (14) 3471-1266</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Rua Barão do Rio Branco, 420 - Centro, Garça - SP, 17400-000<br>Tel: (14) 3471-1250</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Avenida Engenheiro Luiz Edmundo Carrijo Coube, 1-100 - Vila Universitária, Bauru - SP, 17033-360<br>Tel: (14) 3103-7777</div>
        </div>` },
    { name: "Guararapes", lat: -21.5362, lng: -50.3175, popup: `
        <div class="popup-box">
            <strong>Guararapes</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Duque de Caxias, 1000 - Guararapes, SP, 16700-000<br>Tel: (18) 3606-1347</div>
            <div class="orgao"><strong>Delegacia:</strong><br>Rua Prudente de Morais, 385 - Centro, Guararapes - SP, 16700-000<br>Tel: (18) 3606-4345</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Lions Club, 100 - Morada dos Nobres, Araçatuba - SP, 16022-000<br>Tel: (18) 2102-2670</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Rua José Rabelo de Vasconcelos, 720 - Centro, Guararapes - SP, 16700-000<br>Tel: (18) 3406-8600</div>
        </div>` },
    { name: "Governador Dix-Sept Rosado", lat: -5.9333, lng: -37.1667, popup: `
        <div class="popup-box">
            <strong>Governador Dix-Sept Rosado</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Avenida Aldemir Fernandes, 147 - Bairro Aeroporto, Mossoró - RN, 59607-150<br>Tel: (84) 3315-5601</div>
            <div class="orgao"><strong>Delegacia:</strong><br>Rua José Fernandes, 135 - Centro, Governador Dix-Sept Rosado - RN, 59790-000<br>Tel: (84) 3320-0135</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>Rua Felipe Camarão, 149 - Aeroporto, Mossoró - RN, 59607-340<br>Tel: (84) 3315-5050</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Rua Francisco Bessa, 168 - Nova Betânia, Mossoró - RN, 59612-207<br>Tel: (84) 3317-6073</div>
        </div>` },
    { name: "Lorena", lat: -22.8056, lng: -45.1925, popup: `
        <div class="popup-box">
            <strong>Lorena</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>Av. Cel. Márciano, 122-218 - Santo Antonio, Lorena - SP, 12608-570<br>Tel: (12) 3153-2236</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Joaquim Cardoso Machado, 385 - Vila Geny, Lorena - SP, 12604-110<br>Tel: (12) 3157-3800</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Padre João Renaudin, 295 - Olaria, Lorena - SP, 12607-150<br>Tel: (12) 3301-1627</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Rua Dom Bosco, 562 - Centro, Lorena - SP, 12600-100<br>Tel: (12) 3159-3344 ou (12) 3159-3349</div>
        </div>` },
    { name: "Cruzeiro", lat: -22.7392, lng: -45.0549, popup: `
        <div class="popup-box">
            <strong>Cruzeiro</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. Cap. Neco, 140 - Vila Ana Rosa Novaes, Cruzeiro - SP, 12701-000<br>Tel: (12) 3144-0601</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Dr. Celestino, 156 - Centro, Cruzeiro - SP, 12701-430<br>Tel: (12) 3143-2010</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. Independência, 630 - Vila Paulista, Cruzeiro - SP, 12702-470<br>Tel: (12) 3144-2100</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>Av. Maj. Novaes, 715 - Centro, Cruzeiro - SP, 12701-000<br>Tel: (12) 3184-7000</div>
        </div>` },
    { name: "Caçapava", lat: -22.9028, lng: -45.4614, popup: `
        <div class="popup-box">
            <strong>Caçapava</strong><br><br>
            <div class="orgao"><strong>Polícia Militar:</strong><br>R. São Francisco, 900 - Vila Antônio Augusto Luiz, Caçapava - SP, 12287-010<br>Tel: (12) 3653-2720</div>
            <div class="orgao"><strong>Delegacia:</strong><br>R. Comendador João Lopes, 130 - Centro, Caçapava - SP, 12281-490<br>Tel: (12) 3652-5535</div>
            <div class="orgao"><strong>Bombeiros:</strong><br>R. São Francisco, 888 - Vila Antônio Augusto Luiz, Caçapava - SP, 12287-010<br>Tel: (12) 3653-1212</div>
            <div class="orgao"><strong>Hospital Público:</strong><br>R. Cel. João Dias Guimarães, 266 - Centro, Caçapava - SP, 12281-350<br>Tel: (12) 3221-1000</div>
        </div>` },
];

// Adicionar marcadores ao mapa
locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
        .addTo(leafletMap)
        .bindTooltip(loc.name, { direction: 'top' })
        .bindPopup(loc.popup);

    // Zoom ao clicar no marcador
    marker.on('click', () => {
        leafletMap.setView([loc.lat, loc.lng], 15);
    });
});

// Focar o mapa ao clicar nos links da sidebar
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = parseFloat(link.getAttribute('data-lat'));
        const lng = parseFloat(link.getAttribute('data-lng'));
        leafletMap.setView([lat, lng], 15);
    });
});

// Filtrar locais na sidebar ao pressionar Enter
document.querySelector('.search-bar').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const filter = e.target.value.toLowerCase();
        document.querySelectorAll('.sidebar a').forEach(link => {
            const text = link.textContent.toLowerCase();
            link.parentElement.style.display = text.includes(filter) ? 'block' : 'none';
        });
    }
});