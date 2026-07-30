import dayjs from "dayjs";
import jalaliday from "jalaliday";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// اضافه کردن پلاگین‌ها
dayjs.extend(jalaliday);
dayjs.extend(utc);
dayjs.extend(timezone);

// این خط بسیار مهم است و خطای تصویر را برطرف می‌کند
export default dayjs;
