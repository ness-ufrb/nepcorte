from . import data_setup, model
import torch

def make_mask(img_path: str):
    """
    Args:
        img_path: Path da imagem a ser segmentada.

    Returns:
        mask (torch.Tensor): Máscara predita com formato [1, 704, 1056].
    """
    # Transforma a imagem
    img_batch = data_setup.transform_img(img_path)

    # Carrega o modelo UNet
    unet = model.UNET
    unet.eval()

    # Modo de inferência
    with torch.inference_mode():
        # Faz a predição
        pred = unet(img_batch)
        mask = torch.argmax(pred, 1).cpu()

    return mask
