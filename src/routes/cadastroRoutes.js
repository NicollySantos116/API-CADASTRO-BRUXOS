import express from 'express';
import { getAllBruxos,getBruxoById,createBruxo, updateBruxo , deleteBruxo} from '../controllers/cadastroController.js';

const router  = express.Router();

router.get('/', getAllBruxos); 
router.get('/:id', getBruxoById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxo);
router.put("/:id", updateBruxo);
export default router;