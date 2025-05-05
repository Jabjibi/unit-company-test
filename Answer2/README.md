
# To-do App

---

## 🚀 เริ่มต้นใช้งาน

1. ติดตั้ง dependencies:

```bash
npm install
```
2. ติดตั้ง PgAdmin

3. เริ่มเซิร์ฟเวอร์:

```bash
npm run dev
```

4. เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

---

## 🔧 ฟีเจอร์หลักที่พัฒนา

- ✅ ระบบเพิ่ม ลบ แก้ไขงาน (CRUD Tasks)
- ✅ จัดกลุ่มงานตาม Priority และสถานะ (Done / Pending)
- ✅ Drag & Drop ย้าย Priority
- ✅ หน้า DonePage สำหรับแสดงงานที่ทำเสร็จแล้ว แยกตามระดับ Priority
- ✅ หน้า EditPage สำหรับแก้ไขรายละเอียดแบบเรียลไทม์
- ✅ ตรวจสอบวันที่ไม่ให้ย้อนหลัง (validation ด้วย Date)
- ✅ รองรับหน้าจอหลายขนาด (32", Laptop, Tablet, Mobile)
- ✅ Navigation ด้วย Sidebar
- ✅ เอกสาร API ด้วย Swagger UI

---

## 📘 Swagger API Documentation

- สร้างจาก `swagger-jsdoc` + `swagger-ui-react`
- เปิดดูได้ที่: [http://localhost:3000/docs](http://localhost:3000/docs)
- มีการกำหนด schema เช่น `Todo`, `NewTodo` และ route เช่น `GET /api/todos`, `POST`, `PATCH`, `DELETE`

---

## 🧠 เพิ่มเติม

- ใช้ Prisma กับ PostgreSQL
- Type-safe API ด้วย TypeScript
- สร้าง REST API ด้วย Next.js App Router
- ใช้ Tailwind CSS ในการจัด Layout

---

## 📦 โครงสร้างฐานข้อมูล (PostgreSQL)

ใช้ฐานข้อมูลชื่อ `ADD_TODO` ใน table `todos`

```sql
-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
```

### Prisma Schema

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  due_date    DateTime
  priority    String
  status      String
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
}
```

เชื่อมต่อผ่าน `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ADD_TODO"
```

---

## 📘 Swagger API Docs

เอกสาร API จะอยู่ที่ `/docs` โดยสร้างจาก comment JSDoc บน route

