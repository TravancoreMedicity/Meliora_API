const axios = require('axios');

const sendIncidentRequestWhatsapp = async ({
    mobile,
    employeeName,
    incidentNo,
    creatorName,
    type = 'Data Collection',
    creatorDepartment
}) => {

    const payload = {
        phone: `+91${mobile}`,
        template_name: 'incident_request',
        language_code: 'en',
        components: [
            {
                type: 'body',
                parameters: [
                    {
                        type: 'text',
                        text: employeeName
                    },
                    {
                        type: 'text',
                        text: type
                    },
                    {
                        type: 'text',
                        text: incidentNo
                    },
                    {
                        type: 'text',
                        text: creatorName
                    },
                    {
                        type: 'text',
                        text: creatorDepartment
                    }
                ]
            }
        ]
    };

    return await axios.post(
        'https://travancoremedicity.w7.bitvoice.in/api/send-template',
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.BITVOICE_API_KEY
            }
        }
    );
};

module.exports = {
    sendIncidentRequestWhatsapp
};