const connection = require('../database/connection');
module.exports = {

    async listAll(request, response) {
        const { page = 1 } = request.query;

        const [totalIncidents] = await connection('incidents')
        .count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=' , 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select('incidents.*', 
                'ongs.name', 
                'ongs.email',
                'ongs.whatsapp', 
                'ongs.city',
                'ongs.uf'
                );

        response.header('X-Total-Count', totalIncidents['count(*)']);
        return response.json(incidents);
    },

    async list(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
           title,
           description,
           value,
           ong_id
        });
    return response.json({ id }); 
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const apagar = await connection('incidents').where('id', id).andWhere('ong_id', ong_id).del();

        if(!apagar){
           return response.status(401).json({error : 'Operation not permitted.'});
        }

        return response.status(200).json('Deletado com Sucesso');
    }
}