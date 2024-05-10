"""
Contem funcionalidades para configurar a imagem
de entrada em um input aceitavel pelo modelo UNET
"""

import torch
from torchvision import transforms as tf
from PIL import Image

class NewPad(object):
  def __init__(self, fill=0, padding_mode='constant'):
      self.fill = fill
      self.padding_mode = padding_mode

  def __call__(self, img):
    """
    Args:
      img (PIL Image): Image to be padded.

    Returns:
      PIL Image: Padded image.
    """
    return tf.functional.pad(img, (10, 7, 9, 6), self.fill, self.padding_mode)

  def __repr__(self):
    return self.__class__.__name__ + '(padding={0}, fill={1}, padding_mode={2})'.\
        format(self.fill, self.padding_mode)


mean_and_std_list_file = open(f"review/ia_code/marbling/mean_and_std.txt", "r")
content_list = mean_and_std_list_file.readlines()

mean = [float(integer) for integer in content_list[1].split(' ')[0:3]]
std = [float(integer) for integer in content_list[3].split(' ')[0:3]]

transform = tf.Compose([NewPad(), tf.ToTensor(), tf.Normalize((mean[0], mean[1], mean[2]), (std[0], std[1], std[2]))])

def transform_img(img_path: str):
  """
  Args:
    img_path: Path of the image to be transformed.

  Returns:
    img_batch (torch.Tensor): Transformed image with shape [1, 3, 704, 1056].
  """

  img = Image.open(img_path)
  
  img_batch = transform(img).unsqueeze(0)

  return img_batch
