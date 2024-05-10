"""
Contem o modelo UNET treinado para segmentacao
binaria da peca de carne para analise do marmoreio
"""

import segmentation_models_pytorch as smp
import torch

model_weights_path = 'review/ia_code/marbling/UNET_best_1e-05.torch'
model_weights = torch.load(model_weights_path, map_location='cpu')

UNET = smp.Unet(
    encoder_name="resnet34",
    encoder_weights="imagenet",
    in_channels=3,
    classes=2
).to('cpu')

UNET.load_state_dict(model_weights)
