import pyowm
owm = pyowm.OWM('b58f66ea030f42fad0c0d3c651b4fbe5')
from pyowm.commons.enums import ImageTypeEnum
from pyowm.agroapi10.enums import SatelliteEnum, PresetEnum

mgr = owm.agro_manager()


pol_id = '635cf25a176fe6831443f2df'  # your polygon's ID
acq_from = 1669852800               # 18 July 2017
acq_to = 1672444800                 # 26 October 2017
img_type = ImageTypeEnum.GEOTIFF     # the image format type
preset = PresetEnum.NDVI    # the preset
sat = SatelliteEnum.LANDSAT_8.symbol # the satellite


# the search returns images metadata (in the form of `MetaImage` objects)
results = mgr.search_satellite_imagery(pol_id, acq_from, acq_to, img_type=img_type, preset=preset, acquired_by=sat)

# download all of the images
satellite_images = [mgr.download_satellite_image(result) for result in results]

# get stats for the first image
sat_img = satellite_images[0]
stats_dict = mgr.stats_for_satellite_image(sat_img)
print(sat_dict)

# ...satellite images can be saved to disk
# sat_img.persist('/path/to/my/folder/sat_img.tif')