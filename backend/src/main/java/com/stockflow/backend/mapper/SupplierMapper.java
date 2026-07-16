package com.stockflow.backend.mapper;

import com.stockflow.backend.dto.SupplierResponse;
import com.stockflow.backend.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {
    public SupplierResponse toResponse(Supplier supplier){
        SupplierResponse supplierResponse = new SupplierResponse();
        supplierResponse.setId(supplier.getId());
        supplierResponse.setName(supplier.getName());
        supplierResponse.setTelephone(supplier.getTelephone());
        supplierResponse.setEmail(supplier.getEmail());
        supplierResponse.setActive(supplier.isActive());

        return supplierResponse;
    }
}
