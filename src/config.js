import { format, subHours } from "date-fns";

const today = format(subHours(new Date(), 2), "YYYY-MM-DD");
const token = `dPofjqpuZQqtCvibUbEcYWtErdfKfazFCwQUPMrWY6tgRBxkfXgcmdDmCQHtnNxX${today}`;

const CONFIG = {
    ORIGIN: 'http://localhost:8080/',
    TOKEN: token
}

export default CONFIG;