import * as dayjs from "dayjs";
import *  as localization from "dayjs/plugin/localizedFormat"
import 'dayjs/locale/fr'
const DateUtils = {
    convert: (date) =>{

        dayjs.extend(localization)
        dayjs.locale('fr')

        return dayjs(date).format("LLL");
    }
}

export default DateUtils