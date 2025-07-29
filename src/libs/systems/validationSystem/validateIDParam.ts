import type { Race } from 'libs/entities'

const VALID_ID_PARAMS: Race[] = ['blazefen']

const validateIDParam = (idParam: Race) => {
    if (!VALID_ID_PARAMS.includes(idParam)) {
        throw new Error(`Invalid id parameter: '${idParam}'.`)
    }
}

export default validateIDParam

