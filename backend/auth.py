@router.post("/forgot-password")
async def forgot_password(email: str):
    # 1. Verificar que el usuario existe
    # 2. Generar token único de recuperación
    # 3. Guardar token en BD con expiración
    # 4. Enviar email con link: 
    #    https://cattlesis.com/reset-password?token=ABC123
    # 5. Retornar éxito
    pass